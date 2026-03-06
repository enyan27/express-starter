import express from "express";
import path from "path";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";
import { db } from "./drizzle/db.js";
import { logger } from "./lib/logger.js";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json());
app.use(helmet()); // secure http headers
app.use(morgan("dev")); // log requests

app.get("/api", async (_, res) => res.json(await db.query.users.findMany()));

// deploy chung backend và frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.use((_, res) => res.sendFile(path.join(__dirname, "../frontend/dist/index.html")));
}

app.listen(PORT, () => logger.info(`Server is running on http://localhost:${PORT}`));
