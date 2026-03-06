import "dotenv/config";
import { db } from "./db.js";
import { users } from "./schema.js";
import { logger } from "../lib/logger.js";

const USERS = [
  {
    email: "enanan@gmail.com",
    password: "123456"
  }
];

(async () => {
  try {
    await db.transaction(async (tx) => {
      await tx.execute("TRUNCATE TABLE users CASCADE");
      await tx.insert(users).values(USERS);
    });

    logger.info("Seeding completed");
    process.exit(0);
  } catch (error) {
    logger.fatal(error);
    process.exit(1);
  }
})();
