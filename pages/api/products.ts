import { NextApiRequest, NextApiResponse } from "next";
import medusa from "../../lib/config";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const products = await fetch("http://localhost:9000/store/products").then(
    (data) => data.json()
  );

  res.json(products);
};
