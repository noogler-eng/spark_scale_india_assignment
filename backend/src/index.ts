import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req: any, res: any) => {
  res.json({
    msg: "server is running",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server listening at: http://localhost:${PORT}`);
});
