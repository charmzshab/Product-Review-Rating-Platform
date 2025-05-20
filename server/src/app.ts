import express from  "express";
import mongoose from "mongoose";
import { connectDB } from "./config/db";
import { PORT } from "./config/env";


const app = express();

app.listen(PORT, () => {
    connectDB();
  console.log(`Server is running on port ${PORT}`);
});