export default async function handler(req, res) {
  const { make, model, year } = req.query;

  if (!make || !model) {
    return res.status(400).json(null);
  }

  try {
    const url = `https://carapi.app/api/trims?make=${encodeURIComponent(
      make
    )}&model=${encodeURIComponent(model)}&year=${year || 2020}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return res.status(200).json(null);
    }

    const trim = data.data[0];

    const stockHp = trim.engine_power_hp || 0;

    const stage1 = Math.round(stockHp * 1.22);
    const stage2 = Math.round(stockHp * 1.35);

    res.status(200).json({
      engine: trim.engine || "Unknown",
      fuel: trim.engine_type || "",
      stock_hp: stockHp,
      stage1_hp: stage1,
      stage2_hp: stage2
    });
  } catch (err) {
    res.status(500).json(null);
  }
}
