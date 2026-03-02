export default async function handler(req, res) {
  const make = req.query.make;
  if (!make) return res.status(200).json([]);

  try {
    const r = await fetch(
      `https://api.api-ninjas.com/v1/carmodels?make=${make}`,
      { headers: { "X-Api-Key": process.env.CAR_API_KEY } }
    );
    const data = await r.json();
    res.status(200).json(data || []);
  } catch {
    res.status(200).json([]);
  }
}
