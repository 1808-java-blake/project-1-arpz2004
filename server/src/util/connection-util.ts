import { Pool } from 'pg';

export const connectionPool = new Pool({
  database: 'postgres',
  host: process.env["MOVIE_DB_HOST"],
  max: 2,
  password: process.env["MOVIE_DB_PASSWORD"],
  port: 5432,
  user: process.env["MOVIE_DB_USERNAME"]
})
