import { NextFunction, Request, Response } from 'express';
import IUser from '../interfaces/IUser';
import UsersService from '../services/Users.service';

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const user: IUser = req.body;
  const VALID_EMAIL = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w{2,3}([-.]\w{2,3})*$/;
  const VALID_PASSWORD = (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9]{8,}/g);  

  if (!user.email || !user.password) {
    return res.status(400).json({
      message: 'Enter email and password to register.' });
  }
  const isValidPassword = VALID_PASSWORD.test(user.password);
  const isValidEmail = VALID_EMAIL.test(user.email);

  if (!isValidEmail) {
    return res.status(401).json({
      message: 'Please inform a valid email address.'
    });
  }

  if (!isValidPassword) {
    return res.status(401).json({
      message: 'Password must have at least 8 characters,' +
        ' 1 uppercase letter and 1 number',
    });
  }

  const userExists = await UsersService.userExists(user.email);
  
  if (!userExists) return res.status(400)
    .json({ message: `Unable to find an user with this email address: ${user.email}` });

  next();
};

export default validateLogin;
