import express from "express";

const userRouter = express.Router();

userRouter.get("/", (req: any, res: any) => {
  res.json({
    msg: "this is user router",
  });
});

export default userRouter;
