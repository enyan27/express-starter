import express from "express";
import path from "path";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";
import { logger } from "./lib/logger.js";
import { connectDB } from "./mongo/db.js";
import { User } from "./models/User.js";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json());
app.use(helmet()); // secure http headers
app.use(morgan("dev")); // log requests

app.get("/api", async (_, res) => res.json(await User.find()));

// deploy chung backend và frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.use((_, res) => res.sendFile(path.join(__dirname, "../frontend/dist/index.html")));
}

connectDB().then(() => {
  app.listen(PORT, () => logger.info(`Server is running on http://localhost:${PORT}`));
});
