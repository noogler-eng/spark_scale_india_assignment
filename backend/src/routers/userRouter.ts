import express from "express";
import authenticateUser from "../middleware/authenticateUser";
import getUsersTasks from "../controllers/user/getUserTasks";
import addTask from "../controllers/user/addTask";
import editTask from "../controllers/user/editTask";
import addSubTask from "../controllers/user/addSubTask";
import getUser from "../controllers/user/getUser";

const userRouter = express.Router();

// this is for testing purpose
userRouter.get("/", (req: any, res: any) => {
  res.json({
    msg: "this is user router",
  });
});

// getting the user
userRouter.get("/getUser", authenticateUser, getUser);
// get specific user tasks
userRouter.get("/tasks", authenticateUser, getUsersTasks);
// add new task
userRouter.post("/addTask", authenticateUser, addTask);
// editing the task
userRouter.post("/task/:id/edit", authenticateUser, editTask);
// adding the sub task to the parent task
userRouter.post("/task/:id/addSubTask", addSubTask);

export default userRouter;
