import { NextApiResponse, NextApiRequest } from "next";
import prisma from "../../../../prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      const getOneCategory = await prisma.category.findUnique({
        where: {
          id: id as string,
        },
      });
      res.status(200).json(getOneCategory);
      break;
    case "PUT":
      const updateCategory = await prisma.category.update({
        where: { id: id as string },
        data: {
          name: req.body.name,
        },
      });
      res.status(200).json(updateCategory);
      break;
    case "DELETE":
      const deleteCategory = await prisma.category.delete({
        where: { id: id as string },
      });
      res.status(200).json(deleteCategory);
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
