import { NextApiResponse, NextApiRequest } from "next";
import prisma from "../../../../prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      const getOneTag = await prisma.tag.findUnique({
        where: {
          id: id as string,
        },
      });
      res.status(200).json(getOneTag);
      break;
    case "PUT":
      const updateTag = await prisma.tag.update({
        where: { id: id as string },
        data: {
          name: req.body.name,
          postId: req.body.postId,
        },
      });
      res.status(200).json(updateTag);
      break;
    case "DELETE":
      const deleteTag = await prisma.tag.delete({
        where: { id: id as string },
      });
      res.status(200).json(deleteTag);
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
