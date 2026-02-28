export default async function handler(req, res) {
  const { make, year } = req.query;

  if (!make) {
    return res.status(400).json([]);
  }

  try {
    const url = `https://carapi.app/api/models?make=${encodeURIComponent(
      make
    )}&year=${year || 2020}`;

    const response = await fetch(url);
    const data = await response.json();

    const models = data.data.map(m => m.name);

    res.status(200).json(models);
  } catch (err) {
    res.status(500).json([]);
  }
}
