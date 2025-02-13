import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticateUser = (req: any, res: any, next: NextFunction) => {
  // Expecting "Bearer <token>"
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || "") as {
      userId: string;
      isAdmin: boolean;
    };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
};

export default authenticateUser;
