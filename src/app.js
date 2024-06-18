import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import ConnectDB from "./config/ConnectDB.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import productRouter from "./routes/productRouter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

ConnectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
