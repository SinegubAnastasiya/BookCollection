import pool from '../db';
import { iUser } from '../interfaces';

async function userRegDB(username: string, password: string, email: string): Promise<iUser[]> {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const sql: string = 'INSERT INTO users(username, password, email) VALUES ($1, $2, $3) RETURNING *';
    const { rows } = await client.query(sql, [username, password, email]);

    await client.query('COMMIT');

    return rows;
  } catch (error: any) {
    await client.query('ROLLBACK');
    return [];
  } finally {
    client.release();
  }
}

async function findUserByEmailDB(email: string): Promise<iUser[]> {
  const client = await pool.connect();
  const sql: string = 'SELECT * FROM users WHERE email = $1';
  const { rows } = await client.query(sql, [email]);
  client.release();
  return rows;
}

export { userRegDB, findUserByEmailDB };
