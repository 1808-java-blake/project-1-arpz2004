import { Pool } from 'pg';

export const connectionPool = new Pool({
  database: 'postgres',
  host: process.env["RDS_DB_URL"] || 'localhost',
  max: 2,
  password: process.env["RDS_DB_PASSWORD"],
  port: 5432,
  user: process.env["RDS_DB_USERNAME"]
})
