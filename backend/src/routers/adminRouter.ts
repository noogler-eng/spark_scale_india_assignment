import express from "express";

const adminRouter = express.Router();

adminRouter.get("/", (req: any, res: any) => {
  res.json({
    msg: "this is admin router",
  });
});

export default adminRouter;
