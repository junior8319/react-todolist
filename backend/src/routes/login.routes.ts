import { Router } from 'express';
import LoginController from '../controllers/Login.controller';
import errorMiddleware from '../middlewares/error.middleware';
import validateLogin from '../middlewares/validateLogin.middleware';
import validateToken from '../middlewares/validateToken.middleware';

const loginRouter = Router();

loginRouter.post(
  '/login',
  validateLogin,
  LoginController.login,
  errorMiddleware.handleErrors,
);

loginRouter.post(
  '/validate',
  validateToken,
  LoginController.userAuth,
  errorMiddleware.handleErrors,
);

export default loginRouter;
