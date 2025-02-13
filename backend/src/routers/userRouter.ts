import express from "express";

const userRouter = express.Router();

userRouter.get("/", (req: any, res: any) => {
  res.json({
    msg: "this is user router",
  });
});

userRouter.get("/tasks", (req: any, res: any) => {});
userRouter.post("/addTask", (req: any, res: any) => {});
userRouter.post("/task/:id/edit", (req: any, res: any) => {});
userRouter.post("/task/:id/addSubTask", (req: any, res: any) => {});

export default userRouter;
