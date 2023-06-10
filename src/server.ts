import express, { Express, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import todoRoutes from "./routes/todos.routes";
dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/',todoRoutes);
app.get("/", (req: Request, res: Response) => res.send("here we go"));
const port: string | number = process.env.PORT || 4000;

mongoose.set("strictQuery", true);
const DB: string = process.env.CONNECTION_STR || "";

mongoose
  .connect(DB)
  .then(() => {
    console.log("connected on database");
    app.listen(port, () => console.log(`server is running on ${port}...`));
  })
  .catch((err) => console.log(err));
