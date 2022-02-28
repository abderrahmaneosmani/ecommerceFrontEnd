import type { NextApiRequest, NextApiResponse } from "next";
import server from "../../../../utils/vars";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const categoryId = req.query.categoryId;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const { data, isSuccess } = useGetProductsByCategoryIdQuery(categoryId);

  const response = await fetch(
    `${server}/products/category?categoryId=${categoryId}`
  );
  const products = await response.json();
  res.send(products);
}
