import cors from "cors";
import express from "express";
import morgan from "morgan";
import { connectDB } from "./config/db";
import { PORT } from "./config/env";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use("/api/products", require("./route/product").default);
app.use("/api/products", require("./route/review").default);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
