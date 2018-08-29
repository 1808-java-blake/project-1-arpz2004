import { Pool } from 'pg';

export const connectionPool = new Pool({
  database: 'postgres',
  host: process.env["1808_MOVIE_DB_HOST"],
  max: 2,
  password: process.env["1808_MOVIE_DB_PASSWORD"],
  port: 5432,
  user: process.env["1808_MOVIE_DB_USERNAME"]
})
