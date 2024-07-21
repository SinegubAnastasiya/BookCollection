import dotenv from 'dotenv';
dotenv.config();

import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.HOST,
  port: '5432',
  password: process.env.PASSWORD,
  user: 'postgres',
  database: process.env.DATABASE,
});

export default pool;
