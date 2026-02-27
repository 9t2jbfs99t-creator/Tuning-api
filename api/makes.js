export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const makes = [
    "Volvo",
    "BMW",
    "Audi",
    "Mercedes-Benz",
    "Volkswagen",
    "Ford",
    "Toyota",
    "Skoda",
    "Seat",
    "Porsche"
  ];

  res.status(200).json(makes);
}
