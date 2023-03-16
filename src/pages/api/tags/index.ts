import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      const getAllTags = await prisma.tag.findMany();
      res.status(200).json(getAllTags);
      break;
    case "POST":
      const newTag = await prisma.tag.create({
        data: {
          name: req.body.name,
          postId: req.body.postId,
        },
      });
      res.status(200).json(newTag);
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
