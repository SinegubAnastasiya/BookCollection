import express, { Request, Response } from 'express';
const route = express.Router();
import { buildResponse } from '../helper/buildResponse';
import { iBook } from '../interfaces';
import { 
    createBooks, 
    getAllBooks, 
    getBookById,
} from '../service/books.service';

route.post('/', async (req: Request, res: Response) => {
  try {
    const { title, author, publicationDate, genres } = req.body;
    const data: iBook[] = await createBooks(title, author, publicationDate, genres);
    buildResponse(res, 200, data);
  } catch (error: any) {
    buildResponse(res, 404, error.message);
  }
});

route.get('/', async (req: Request, res: Response) => {
  try {
    const data: iBook[] = await getAllBooks();
    buildResponse(res, 200, data);
  } catch (error: any) {
    buildResponse(res, 404, error.message);
  }
});

route.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: iBook[] = await getBookById(id);
    buildResponse(res, 200, data);
  } catch (error: any) {
    buildResponse(res, 404, error.message);
  }
});

export default route;
