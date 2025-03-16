import express, { json } from "express";
import dotenv from "dotenv";
import { connectDB } from "./db";
import todoRoutes from "./routes/todo";

dotenv.config({
  path: ".env",
});

const app = express();
app.use(json());

app.use(todoRoutes);

const PORT = process.env.PORT || "4000";

app.listen(PORT, () => {
  connectDB();
  console.log("server is running on : " + PORT);
});
