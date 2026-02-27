export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { make, model } = req.query;

  const data = {
    Volvo: {
      S60: { engine: "B4 2.0T", stock: 197, stage1: 240, stage2: 270 },
      XC60: { engine: "B5 AWD", stock: 250, stage1: 290, stage2: 320 }
    },
    BMW: {
      "330i": { engine: "2.0T", stock: 258, stage1: 300, stage2: 330 },
      "M340i": { engine: "3.0T", stock: 374, stage1: 430, stage2: 480 }
    },
    Audi: {
      A4: { engine: "2.0T", stock: 190, stage1: 230, stage2: 260 }
    }
  };

  res.status(200).json(data?.[make]?.[model] || null);
}
