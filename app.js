import express from "express";
import morgan from "morgan";
import { authRouter } from "./routes/auth.js";

export const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/users", authRouter);
