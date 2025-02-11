import dotenv from "dotenv";
dotenv.config();


import express from "express";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/database.config.js";
import { todosRouter, authRouter, usersRouter } from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Get the directory name properly in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "ejs")); // Set path to the 'ejs' folder inside 'src'

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// db connection
connectDB();

// routes
app.use("/todos", todosRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);

app.use((_, res, __) => {
  res.status(404).json({
    message: "Not found",
  });
});

// error handling middleware
app.use((error, _, res, __) => {
  if (error.messages) {
    res.status(error.status || 500).json({
      message: error.message || "Something went wrong",
      description: error.messages[0],
    });
  } else {
    res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
});

export default app;