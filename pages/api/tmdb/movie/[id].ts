import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id' });
  const apiUrl = `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
  const tmdbRes = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  if (!tmdbRes.ok) return res.status(404).json({ error: 'Not found' });
  const data = await tmdbRes.json();
  res.status(200).json(data);
}
