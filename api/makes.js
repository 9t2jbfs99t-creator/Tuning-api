export default async function handler(req, res) {
  try {
    const response = await fetch("https://carapi.app/api/makes");
    const data = await response.json();

    const makes = data.data.map(m => m.name);

    res.status(200).json(makes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch makes" });
  }
}
