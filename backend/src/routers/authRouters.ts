import express from "express";
import loginController from "../controllers/auth/login";
import signup from "../controllers/auth/signup";

const authRouter = express.Router();

// route for testing the router
authRouter.get("/", (req: any, res: any) => {
  res.json({
    msg: "this is auth router",
  });
});

authRouter.post("/signup", signup);
authRouter.get("/login", loginController);

export default authRouter;
