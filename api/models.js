export default async function handler(req, res) {
  const { make, year } = req.query;

  if (!make) {
    return res.status(400).json({
      error: "Missing make parameter",
      fallback: true
    });
  }

  const safeYear = year || 2020; // ← VIKTIGT

  try {
    const apiRes = await fetch(
      `https://api.api-ninjas.com/v1/carmodels?make=${encodeURIComponent(make)}&year=${safeYear}`,
      {
        headers: {
          "X-Api-Key": process.env.API_NINJAS_KEY
        }
      }
    );

    if (!apiRes.ok) {
      const text = await apiRes.text();
      return res.status(500).json({
        error: "API Ninjas error",
        status: apiRes.status,
        body: text,
        fallback: true
      });
    }

    const data = await apiRes.json();

    if (!Array.isArray(data)) {
      return res.status(200).json({
        fallback: true,
        data: []
      });
    }

    res.status(200).json({
      fallback: false,
      data
    });

  } catch (err) {
    res.status(500).json({
      error: "Server crash",
      message: err?.message || "unknown",
      fallback: true
    });
  }
}
