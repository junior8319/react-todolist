import IUser from '../../../backend/src/interfaces/IUser';
import { ILoginUser } from '../../../backend/src/interfaces/ILogin';
import IToken from '../../../backend/src/interfaces/IToken';
import ITask from '../../../backend/src/interfaces/ITask';

export default interface IContext {
  users: IUser[] | null;
  tasks: ITask[] | [];
  userLogged: IUser | null;
  token: IToken | null;
  login: ILoginUser;
  isLoginOpen: boolean;
  handleChange: (event: any) => void;
  handleLogin: (event: any) => void;
  handleLogout: (event: any) => void;
  openLogin: () => void;
  closeLogin: () => void;
}