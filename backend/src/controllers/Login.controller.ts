import { Request, Response, NextFunction } from 'express';
import LoginService from '../services/Login.service';
import jwtGenerator from '../helpers/jwtGenerator';
import { ILoginUser } from '../interfaces/ILogin';

class LoginController {
  public service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      
      const user: ILoginUser = { email, password };
      const userData = await this.service.login(user);

      if (!userData) {
        return res.status(400).json({ message: 'Unable to login.' });
      }

      console.log('USERDATA', userData);
      
      
      return res.status(200).json(userData);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public userAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;      

      if (!authorization) {
        return res.status(401).json({ message: 'Token não encontrado.' });
      }

      const decoded = await jwtGenerator.verify(authorization);

      return res.status(200).json(decoded);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default new LoginController();
