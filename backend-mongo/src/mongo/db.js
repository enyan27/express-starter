import mongoose from "mongoose";
import { logger } from "../lib/logger.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    logger.info("Database connected");
  } catch (error) {
    logger.fatal(error);
    process.exit(1);
  }
};
