import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      const getAllComments = await prisma.comment.findMany({
        include: {
          author: true,
        },
      });
      res.status(200).json(getAllComments);
      break;
    case "POST":
      const newComment = await prisma.comment.create({
        data: {
          content: req.body.content,
          authorId: req.body.authorId,
          postId: req.body.postId,
        },
      });
      res.status(200).json(newComment);
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
