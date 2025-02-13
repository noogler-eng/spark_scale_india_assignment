import express from "express";
import authenticateUser from "../middleware/authenticateUser";

const adminRouter = express.Router();

adminRouter.get("/", (req: any, res: any) => {
  res.json({
    msg: "this is admin router",
  });
});

// getting all the tasks
adminRouter.get("/tasks", authenticateUser, (req: any, res: any) => {});

export default adminRouter;
