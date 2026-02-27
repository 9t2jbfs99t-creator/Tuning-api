export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { make } = req.query;

  const models = {
    Volvo: ["S60", "S90", "V60", "V90", "XC60", "XC90"],
    BMW: ["320i", "330i", "M340i", "X3", "X5"],
    Audi: ["A4", "A6", "Q5", "Q7"],
    "Mercedes-Benz": ["C200", "C300", "E220", "E300"],
    Volkswagen: ["Golf", "Passat", "Tiguan"],
    Ford: ["Focus", "Fiesta", "Mustang"],
    Toyota: ["Corolla", "Camry", "Supra"],
    Skoda: ["Octavia", "Superb"],
    Seat: ["Leon", "Ibiza"],
    Porsche: ["911", "Cayenne"]
  };

  res.status(200).json(models[make] || []);
}
