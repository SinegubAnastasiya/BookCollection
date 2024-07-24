import bcrypt from 'bcrypt';
import { iUser } from '../interfaces';
import { userRegDB, findUserByEmailDB } from '../repository/user.repository';

const saltround = 3;

async function userReg(username: string, password: string, email: string): Promise<iUser[]> {
  const foundedEmail: iUser[] = await findUserByEmailDB(email);
  if (foundedEmail.length) throw new Error('Such user already exists');

  const hashedPwd: string = await bcrypt.hash(password, saltround);

  const user: iUser[] = await userRegDB(username, email, hashedPwd);
  if (!user.length) throw new Error('Data is not saved');
  return user;
}

async function userAuth(username: string, password: string): Promise<iUser[]> {
  const user: iUser[] = await findUserByEmailDB(username);
  if (!user.length) throw new Error('Wrong email or password');

  const comparePwd: boolean = await bcrypt.compare(password, user[0].password);
  if (!comparePwd) throw new Error('Wrong email or password');

  return user;
}

export { userReg, userAuth };
