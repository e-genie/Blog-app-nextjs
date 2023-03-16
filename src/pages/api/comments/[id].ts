import { NextApiResponse, NextApiRequest } from "next";
import prisma from "../../../../prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      const getOneComment = await prisma.comment.findUnique({
        where: {
          id: id as string,
        },
        include: {
          author: true,
        },
      });
      res.status(200).json(getOneComment);
      break;
    case "PUT":
      const updateComment = await prisma.comment.update({
        where: { id: id as string },
        data: {
          content: req.body.content,
          authorId: req.body.authorId,
          postId: req.body.postId,
        },
      });
      res.status(200).json(updateComment);
      break;
    case "DELETE":
      const deleteComment = await prisma.comment.delete({
        where: { id: id as string },
      });
      res.status(200).json(deleteComment);
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
