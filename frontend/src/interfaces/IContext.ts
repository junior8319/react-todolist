import IUser, { IRegistering } from '../interfaces/IUser';
import { ILoginUser } from '../interfaces/ILogin';
import IToken from '../interfaces/IToken';
import ITask from '../interfaces/ITask';
import IError from './IError';

export default interface IContext {
  inRegistrationUser: IRegistering;
  users: IUser[] | null;
  tasks: ITask[] | [];
  userLogged: IUser | null;
  response: IError | null;
  token: IToken | null;
  login: ILoginUser;
  isLoginOpen: boolean;
  handleChange: (event: any) => void;
  handleRegisterChange: (event: any) => void;
  handleLogin: (event: any) => void;
  handleLogout: (event: any) => void;
  handleRegister: (event: any) => void;
  openLogin: () => void;
  closeLogin: () => void;
}