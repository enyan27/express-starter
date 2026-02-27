import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";
import { db } from "./drizzle/db.js";
import { logger } from "./libs/logger.js";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json()); // parse json body
app.use(cors()); // enable cors
app.use(helmet()); // secure http headers
app.use(morgan("dev")); // log requests

app.get("/api", async (_, res) => res.json(await db.query.users.findMany()));

// ready for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.use((_, res) => res.sendFile(path.join(__dirname, "../frontend/dist/index.html")));
}

app.listen(PORT, () => logger.info(`Server is running on http://localhost:${PORT}`));
