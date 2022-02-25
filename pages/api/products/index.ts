import type { NextApiRequest, NextApiResponse } from "next";
import server from "../../../utils/vars";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(`${server}/products`);
  const products = await response.json();
  res.status(200).json(products);
}
