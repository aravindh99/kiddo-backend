import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
import db from "./src/config/db.js";
import errorHandler from "./src/shared/errorHandler.js";
import "./src/models/initModels.js";




const app = express();

const PORT = process.env.PORT || 5000;

//common middlewares
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false, // true only if cookies are used
}));
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));


//health check 
app.get("/", (req, res) =>  res.json({message: `server is running ;)`}));


// routes


//404 route path
  app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });


//error handling middleware
 app.use(errorHandler);

//server start
try {
  await db.authenticate();
  console.log("DB connected");

  await db.sync({force: true}); // sync

  app.listen(PORT, "0.0.0.0", () =>
    console.log(`http://localhost:${PORT}`)
  );
} catch (err) {
  console.error("DB connection failed", err);
  process.exit(1);
}


