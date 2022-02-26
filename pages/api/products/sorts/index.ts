import type { NextApiRequest, NextApiResponse } from "next";
import server from "../../../../utils/vars";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sort = req.query.sort;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const { data, isSuccess } = useGetProductsByCategoryIdQuery(categoryId);

  const response = await fetch(`${server}/products/sort?sort=${sort}`);
  const product = await response.json();
  res.status(200).json(product);
}
