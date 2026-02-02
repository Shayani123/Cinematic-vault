import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL not found in .env");
}

const pool = new Pool({
  // user: process.env.DATABASE_USER,
  // password: process.env.DATABASE_PASSWORD,
  // host: process.env.DATABASE_HOST,
  // port: Number(process.env.DATABASE_PORT),
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Neon / cloud DB
  },
  max: 10, // optional
});

pool.on("connect", () => {
  console.log("✅ Database connected");
});

pool.on("error", (err) => {
  console.error("❌ Unexpected DB error", err);
  process.exit(1);
});

export default pool;
