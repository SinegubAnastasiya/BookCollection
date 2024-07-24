import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import routeBooks from './controller/books.controller';
import routeUsers from './controller/user.controller';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true,
  }),
);

app.use(bodyParser.json());

app.use('/books', routeBooks);
app.use('/users', routeUsers);

app.use((er: any, _req: Request, res: Response, next: NextFunction) => {
  res.send(er.message);
  next();
});

export { app };
