import mongoose from "mongoose";
import "dotenv/config";
import { connectDB } from "./db.js";
import { logger } from "../lib/logger.js";
import { User } from "../models/User.js";

const USERS = [
  {
    email: "enanan@gmail.com",
    password: "123456"
  }
];

(async () => {
  try {
    await connectDB();
    await mongoose.connection.dropDatabase();
    await User.create(USERS);

    logger.info("Seeding completed");
    process.exit(0);
  } catch (error) {
    logger.fatal(error);
    process.exit(1);
  }
})();
