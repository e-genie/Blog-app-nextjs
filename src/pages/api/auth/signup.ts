import argon2 from "argon2";
import { NextApiHandler } from "next";
import prisma from "../../../../prisma/client";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET || "secret";

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;

  if (method !== "POST") {
    return res.status(500).json("Method not allowed");
  }
  try {
    const { username, email, password } = req.body;

    const hashingOptions = {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 5,
      parallelism: 1,
    };

    const hashedPassword = await argon2.hash(password, hashingOptions);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
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
