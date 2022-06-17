export default async function handler(req, res) {
  const response = await fetch(process.env.NEXT_PUBLIC_METAPLEX, {
    method: "POST",
    body: req.body,
  });

  res.status(200).json(response);
}
