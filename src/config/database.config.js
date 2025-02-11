import mongoose from "mongoose";

export default function connectDB() {
    mongoose
      .connect(process.env.DB_HOST)
      .then(() => {
        console.log(`🚀 DB is on`);
      })
      .catch(console.log);
}