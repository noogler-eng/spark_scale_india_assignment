import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { string, z } from "zod";
import dotenv from "dotenv";
dotenv.config();

import prisma from "../../db/index";

const loginController = async (req: any, res: any) => {
  try {
    const zodObject = z.object({
      email: string().email(),
      password: string(),
    });

    const isVerifiedInput = zodObject.safeParse(req.body);
    if (!isVerifiedInput.success) {
      console.log(isVerifiedInput.error);
      return res.status(400).json({
        msg: "Invalid inputs",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email: isVerifiedInput.data.email },
      select: {
        id: true,
        email: true,
        isAdmin: true,
        password: true,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(
      isVerifiedInput.data.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY || "",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default loginController;
