import { NextApiRequest, NextApiResponse } from "next";

let rituals = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(rituals);
  } else if (req.method === "POST") {
    const ritual = { ...req.body, id: Date.now().toString() };
    rituals.push(ritual);
    res.status(201).json(ritual);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
