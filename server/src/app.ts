import express, { json } from "express";
import dotenv from "dotenv";
import { connectDB } from "./db";
import todoRoutes from "./routes/todo";
import userRoutes from "./routes/user";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";

dotenv.config({
  path: ".env",
});

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(json());

app.use(userRoutes);
app.use(todoRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || "4000";

app.listen(PORT, () => {
  connectDB();
  console.log("server is running on : " + PORT);
});
