import { NextFunction, Request, Response } from 'express';
import jwtGenerator from '../helpers/jwtGenerator';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401)
    .json({ message: 'Token not found.' });

  const isValidToken = await jwtGenerator.verify(authorization); 

  if (!isValidToken) return res.status(401)
    .json({ message: 'Invalid token.' });
  
  next();
};

export default validateToken;
