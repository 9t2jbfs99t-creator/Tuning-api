import { cars } from "./data";

const fallback = {
  engine: "Generisk turbo",
  stock_hp: 200,
  stage1_hp: 240,
  stage2_hp: 270,
  stage3_hp: 300
};

export default function handler(req, res) {
  const make = (req.query.make || "").toLowerCase();
  const model = (req.query.model || "").toLowerCase();

  const matches = cars.filter(c =>
    c.make === make &&
    c.model === model
  );

  // ✅ Aldrig null
  if (matches.length === 0) {
    res.status(200).json(fallback);
    return;
  }

  res.status(200).json(matches[0]);
}
