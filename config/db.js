import {neon} from "@neondatabase/serverless";

import "dotenv/config";


// CREATES A SQL CONNECTION USING OUR CONNECTION STRING
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is missing");
  process.exit(1);
}

export async function initDB() {

  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions (
       
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL (10,2) NOT NULL,
    category VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE    
    )`;
    console.log("DB Initialized Sucessfully.");
  } catch (error) {
    console.log("Error Initializing DB ", error);
    process.exit(1);
  }

}

export const sql = neon(process.env.DATABASE_URL);