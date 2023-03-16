import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      const getAllCategories = await prisma.category.findMany();
      res.status(200).json(getAllCategories);
      break;
    case "POST":
      const newCategory = await prisma.category.create({
        data: {
          name: req.body.name,
        },
      });
      res.status(200).json(newCategory);
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
