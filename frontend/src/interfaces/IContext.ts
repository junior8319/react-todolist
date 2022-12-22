import IUser, { IRegistering } from '../interfaces/IUser';
import { ILoginUser } from '../interfaces/ILogin';
import IToken from '../interfaces/IToken';
import ITask from '../interfaces/ITask';
import IError from './IError';

export default interface IContext {
  inRegistrationUser: IRegistering;
  isEditing: boolean;
  users: IUser[] | null;
  task: ITask;
  tasks: ITask[] | [];
  unconcludeds: ITask[] | [];
  userLogged: IUser | null;
  response: IError | null;
  token: IToken | null;
  login: ILoginUser;
  isLoginOpen: boolean;
  handleChange: (event: any) => void;
  handleRegisterChange: (event: any) => void;
  handleTaskChange: (event: any) => void;
  handleLogin: (event: any) => void;
  handleLogout: (event: any) => void;
  handleRegister: (event: any) => void;
  handleSendTask: (event: any) => void;
  handleEditTask: (event: any) => void;
  setTasks: (newState: ITask[] | []) => void;
  setIsEditing: (newState: boolean) => void;
  openLogin: () => void;
  closeLogin: () => void;
}