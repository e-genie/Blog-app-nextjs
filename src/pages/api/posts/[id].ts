import { NextApiResponse, NextApiRequest } from "next";
import prisma from "../../../../prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      const getOnePost = await prisma.post.findUnique({
        where: {
          id: id as string,
        },
        include: {
          author: true,
          category: true,
        },
      });
      res.status(200).json(getOnePost);
      break;
    case "PUT":
      const updatePost = await prisma.post.update({
        where: { id: id as string },
        data: {
          title: req.body.title,
          content: req.body.content,
          authorId: req.body.authorId,
          categoryId: req.body.categoryId,
        },
      });
      res.status(200).json(updatePost);
      break;
    case "DELETE":
      const deletePost = await prisma.post.delete({
        where: { id: id as string },
      });
      res.status(200).json(deletePost);
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
