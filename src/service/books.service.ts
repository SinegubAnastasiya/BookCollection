import { iBook } from '../interfaces';
import { 
    createBooksDB, 
    getAllBooksDB, 
    getBookByIdDB,
    updateBooksDB,
    deleteBooksDB
} from '../repository/books.repository';

async function createBooks(title: string, author: string, publicationDate: any, genres: string): Promise<iBook[]> {
  const data: iBook[] = await createBooksDB(title, author, publicationDate, genres);
  if (!data.length) throw new Error('The database does not created');
  return data;
}

async function getAllBooks(): Promise<iBook[]> {
  const data: iBook[] = await getAllBooksDB();
  if (!data.length) throw new Error('Array is empty');
  return data;
}

async function getBookById(id: number): Promise<iBook[]> {
  const data: iBook[] = await getBookByIdDB(id);
  if (!data.length) throw new Error('Such id not found');
  return data;
}

async function updateBooks(id: number, title: string, author: string, publicationDate: any, genres: string): Promise<iBook[]> {
    const data: iBook[] = await updateBooksDB(id, title, author, publicationDate, genres);
    if (!data.length) throw new Error('Data is not saved');
    return data;
}

async function deleteBooks(id: number): Promise<iBook[]> {
    const data: iBook[] = await deleteBooksDB(id);
    if (!data.length) throw new Error('Such data not found');
    return data;
  }

export { 
    createBooks, 
    getAllBooks, 
    getBookById,
    updateBooks,
    deleteBooks
};
