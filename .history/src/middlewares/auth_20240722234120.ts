import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IGetUserAuthInfoRequest } from '../interfaces/IGetUserAuthInfoRequest';

export function authMiddleware(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
