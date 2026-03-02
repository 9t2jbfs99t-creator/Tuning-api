export default function handler(req, res) {
  res.status(200).json({
    keyExists: !!process.env.API_NINJAS_KEY,
    keyLength: process.env.API_NINJAS_KEY
      ? process.env.API_NINJAS_KEY.length
      : 0,
    keyPreview: process.env.API_NINJAS_KEY
      ? process.env.API_NINJAS_KEY.slice(0, 4) + "****"
      : null
  });
}
