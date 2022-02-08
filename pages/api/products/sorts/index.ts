import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sort = req.query.sort;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const { data, isSuccess } = useGetProductsByCategoryIdQuery(categoryId);

  const response = await fetch(
    `http://localhost:9000/products/sort?sort=${sort}`
  );
  const product = await response.json();
  res.status(200).json(product);
}
