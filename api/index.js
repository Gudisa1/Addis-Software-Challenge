import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import songRoutes from "./routes/song.js";
const app = express();

dotenv.config();
const PORT = process.env.PORT || 6001;
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("combined"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(errorMiddleware);
app.use("/api", songRoutes);

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    console.log("Connected to MongoDB");
  })
  .catch((error) => console.log(`${error} did not connect`));
