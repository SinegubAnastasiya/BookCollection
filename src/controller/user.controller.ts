import express, { Request, Response } from 'express';
const route = express.Router();
import { buildResponse } from '../helper/buildResponse';
import { iUser } from '../interfaces';
import { userReg, userAuth } from '../service/user.service';

route.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;
    const data: iUser[] = await userReg(username, password, email);
    buildResponse(res, 200, data);
  } catch (error: any) {
    buildResponse(res, 404, error.message);
  }
});

route.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const data: iUser[] = await userAuth(username, password);
    buildResponse(res, 200, data);
  } catch (error: any) {
    buildResponse(res, 404, error.message);
  }
});

export default route;