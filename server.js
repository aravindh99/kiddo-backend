import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import db from "./src/config/db";
import User from "./src/modules/users/user.model";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));




//health check route
app.get("/", (req, res) => {
    res.send(`server is running and healthy ;)`);
  });




  //404 route path
  app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
  });


 //error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  });
  

  db.sync()
  .then(() => {
    console.log("Tables synced")
    app.listen(PORT, `0.0.0.0`, () => console.log(`server is running:  http://localhost:${PORT}`));  
   })
    .catch(err => console.error("Sync failed:", err));
