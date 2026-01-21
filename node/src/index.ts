import "reflect-metadata";
import dotenv from "dotenv";

import express from "express";

import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index";
import { AppDataSource } from "./database/app-data-source";

dotenv.config();

// establish database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();
app.use(cors({ origin: "*" }));
app.use(morgan("common"));
app.use(express.json());

// Application routes
app.use("/api", routes());

const port = Number(process.env.PORT) || 3000;

app.listen(port, "0.0.0.0", () => console.log(`App listening on port ${port}`));
