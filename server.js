import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config();

import mongoose from "mongoose";

export const connection = mongoose.connect(process.env.DB_HOST);

connection
  .then(() => {
    app.listen(process.env.PORT, process.env.HOST, () => {
      console.log(
        `Server is running on http://${process.env.HOST}:${process.env.PORT}`
      );
    });
  })
  .catch((e) => {
    console.error("Error connecting to database", e);
  });
