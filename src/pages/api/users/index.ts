import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";
import argon2 from "argon2";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      const getAllUsers = await prisma.user.findMany();
      res.status(200).json(getAllUsers);
      break;
    case "POST":
      const { username, email, password } = req.body;

      const hashingOptions = {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 5,
        parallelism: 1,
      };

      const hashedPassword = await argon2.hash(password, hashingOptions);

      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });
      const { password: removedPassword, ...userWithoutPassword } = newUser;

      res.status(200).json(userWithoutPassword);
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
