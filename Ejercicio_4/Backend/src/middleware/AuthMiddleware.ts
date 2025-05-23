import { Request,Response, NextFunction } from 'express';
import jwt from'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;
export function authMiddleware(req:Request, res:Response, next:NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader!.split(' ')[1];

  try {
    const decoded = jwt.verify(token,TOKEN_SECRET || 'AgilTech');
    req.body = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
}
