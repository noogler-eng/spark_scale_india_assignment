import bcrypt from "bcrypt";
import { boolean, string, z } from "zod";
import dotenv from "dotenv";
dotenv.config();

import prisma from "../../db/index";

const signup = async (req: any, res: any) => {
  try {
    const zodObject = z.object({
      email: string(),
      password: string(),
      isAdmin: boolean(),
    });

    const isVerifiedInput = zodObject.safeParse(req.body);
    if (!isVerifiedInput.success)
      return res.status(400).json({
        msg: "Invalid inputs",
      });

    const existingUser = await prisma.user.findUnique({
      where: { email: isVerifiedInput.data.email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(isVerifiedInput.data.password, 10);
    const newUser = await prisma.user.create({
      data: {
        email: isVerifiedInput.data.email,
        password: hashedPassword,
        isAdmin: isVerifiedInput.data.isAdmin || false,
      },
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default signup;
