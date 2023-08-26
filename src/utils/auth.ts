import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import config from 'config';

export const generateToken = (user: { id: string, username: string, email:string }) => {
  const payload = { id: user.id, username: user.username, email: user.email };
  const token = jwt.sign(payload, config.get('jwt_key'), { expiresIn: '1h' });
  return token;
};

export async function hashPassword(password:string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  export function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    const token:any = req.header('Authorization')?.trim();
     const tokenData = token.split(' ')[1];
    if (!token) return res.status(401).send('Access denied. No token provided.');
    //   decode the token to get its data
    const decodedData:any=jwt.verify(tokenData,config.get('jwt_key'));
    //   set the user id in the request
    req.body.user_id = decodedData.id;
    next();
}
