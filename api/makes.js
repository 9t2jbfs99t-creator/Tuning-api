export default async function handler(req, res) {
  try {
    const r = await fetch("https://api.api-ninjas.com/v1/carmakes", {
      headers: { "X-Api-Key": process.env.CAR_API_KEY }
    });
    const data = await r.json();
    res.status(200).json(data || []);
  } catch {
    res.status(200).json(["Audi", "BMW", "Mercedes", "Volkswagen"]);
  }
}
