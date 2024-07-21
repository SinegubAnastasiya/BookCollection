import { Response } from 'express';
import { iBook } from '../interfaces';
type MessageType = iBook | iBook[] | string;

function buildResponse(res: Response, status: number, body: MessageType) {
  res.status(status).send(body);
}

export { buildResponse };