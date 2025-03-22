import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  // If using locally:
  // user: process.env.POSTGRES_USER,
  // password: process.env.POSTGRES_PASSWORD,
  // host: process.env.POSTGRES_HOST,
  // database: process.env.POSTGRES_DATABASE,
});

export async function query(text, params) {
  return pool.query(text, params);
}