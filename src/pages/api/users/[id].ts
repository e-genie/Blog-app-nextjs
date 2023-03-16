import { NextApiResponse, NextApiRequest } from "next";
import prisma from "../../../../prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      const getOneUser = await prisma.user.findUnique({
        where: {
          id: id as string,
        },
      });
      res.status(200).json(getOneUser);
      break;
    case "PUT":
      const updateUser = await prisma.user.update({
        where: { id: id as string },
        data: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        },
      });
      res.status(200).json(updateUser);
      break;
    case "DELETE":
      const deleteUser = await prisma.user.delete({
        where: { id: id as string },
      });
      res.status(200).json(deleteUser);
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
