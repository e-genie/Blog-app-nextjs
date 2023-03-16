import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      const getAllPosts = await prisma.post.findMany({
        include: {
          category: true,
          author: true,
        },
      });
      res.status(200).json(getAllPosts);
      break;
    case "POST":
      const newPost = await prisma.post.create({
        data: {
          title: req.body.title,
          content: req.body.content,
          authorId: req.body.authorId,
          categoryId: req.body.categoryId,
        },
      });
      res.status(200).json(newPost);
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
