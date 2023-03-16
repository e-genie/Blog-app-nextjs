import { NextApiHandler } from "next";
import prisma from "../../../../prisma/client";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET || "secret";

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;

  if (method !== "POST") {
    return res.status(500).json("method not allowed");
  }
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findFirstOrThrow({
      where: {
        username,
      },
    });

    const { password: removedPassword, ...userWithoutPassword } = user;

    const token = jwt.sign(userWithoutPassword, secret);

    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export default handler;
