import pool from '../db';
import { iBook } from '../interfaces';

async function createBooksDB(title: string, author: string, publicationDate: any, genres: string): Promise<iBook[]> {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const sql: string = 'INSERT INTO books(title, author, publicationDate, genres) VALUES ($1, $2, $3, $4) RETURNING *';
    const { rows } = await client.query(sql, [title, author, publicationDate, genres]);

    await client.query('COMMIT');

    return rows;
  } catch (error: any) {
    await client.query('ROLLBACK');
    console.log(error.message);

    return [];
  } finally {
    client.release();
  }
}

async function getAllBooksDB(): Promise<iBook[]> {
  const client = await pool.connect();

  const sql: string = 'SELECT * FROM books ORDER BY id ASC';
  const { rows } = await client.query(sql);
  client.release();
  return rows;
}

async function getBookByIdDB(id: number): Promise<iBook[]> {
  const client = await pool.connect();
  const sql: string = 'SELECT * FROM books WHERE id = $1';
  const { rows } = await client.query(sql, [id]);
  client.release();
  return rows;
}

async function updateBooksDB(id: number, title: string, author: string, publicationDate: any, genres: string): Promise<iBook[]> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
  
      const sql: string = 'UPDATE books SET title = $1, author = $2, publicationDate = $3, genres = $4 WHERE id = $5 RETURNING *';
      const { rows } = await client.query(sql, [title, author, publicationDate, genres, id]);
  
      await client.query('COMMIT');
  
      return rows;
    } catch (error: any) {
      await client.query('ROLLBACK');
      return [];
    } finally {
      client.release();
    }
  }

export { 
    createBooksDB, 
    getAllBooksDB, 
    getBookByIdDB,
    updateBooksDB
};
