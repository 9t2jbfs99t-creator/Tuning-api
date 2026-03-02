export default async function handler(req, res) {
  const { make, model } = req.query;

  const fallback = {
    engine: "Generisk motor",
    stock_hp: 200,
    stage1_hp: 240,
    stage2_hp: 270,
    stage3_hp: 300,
    estimated: true
  };

  if (!make || !model) {
    return res.status(200).json(fallback);
  }

  try {
    // 1️⃣ Hämta trims
    const trimsRes = await fetch(
      `https://api.api-ninjas.com/v1/cartrims?make=${make}&model=${model}`,
      { headers: { "X-Api-Key": process.env.CAR_API_KEY } }
    );

    const trims = await trimsRes.json();
    if (!Array.isArray(trims) || trims.length === 0) {
      return res.status(200).json(fallback);
    }

    // 2️⃣ Hämta detaljer för första trim
    const trim = trims[0];
    const detailsRes = await fetch(
      `https://api.api-ninjas.com/v1/cardetails?make=${make}&model=${model}&trim=${encodeURIComponent(trim)}`,
      { headers: { "X-Api-Key": process.env.CAR_API_KEY } }
    );

    const d = await detailsRes.json();

    const baseHp = d.horsepower || 200;

    res.status(200).json({
      engine: d.engine || "Okänd motor",
      stock_hp: baseHp,
      stage1_hp: Math.round(baseHp * 1.18),
      stage2_hp: Math.round(baseHp * 1.32),
      stage3_hp: Math.round(baseHp * 1.48),
      estimated: false
    });

  } catch {
    res.status(200).json(fallback);
  }
}
