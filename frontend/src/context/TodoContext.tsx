/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from 'react';
import { ILoginUser } from '../../../backend/src/interfaces/ILogin';
import ITask from '../../../backend/src/interfaces/ITask';
import IUser from '../../../backend/src/interfaces/IUser';
import LoginHelper from '../helpers/Login.helper';
import IContext from '../interfaces/IContext';
import IError from '../interfaces/IError';
import IToken from '../../../backend/src/interfaces/IToken';
import ValidateHelper from '../helpers/Validate..helper';
import GetUserHelper from '../helpers/GetUser.helper';

export const initialValues = {
  users: [],
  setUsers: (newState: IUser[]) => {},
  token: null,
  validToken: false,
  setToken: (newState: string) => {},
  userLogged: null,
  setUserLogged: (newState: string) => {},
  tasks: [],
  setTasks: (newState: string) => {},
  login: { email: '', password: '' },
  handleChange: (event: any) => {},
  handleLogin: (event: any) => {},
  handleLogout: (event: any) => {},
  isLoginOpen: false,
  openLogin: () => {},
  closeLogin: () => {},
};

export const TodoContext = createContext<IContext | null>(initialValues);

const TodoProvider = ({ children }: any) => {
  const [users, setUsers] = useState<IUser[]>(initialValues.users);
  const [userLogged, setUserLogged] = useState<IUser | null>(initialValues.userLogged);
  const [tasks, setTasks] = useState<ITask[] |  []>(initialValues.tasks);
  const [login, setLogin] = useState<ILoginUser>(initialValues.login);
  const [response, setResponse] = useState<IUser | IError | null>(null);
  const [token, setToken] = useState<IToken | null>(initialValues.token);
  const [isLoginOpen, setIsLoginOpen] = useState(initialValues.isLoginOpen);

  const openLogin = () => {
    setIsLoginOpen(true);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setLogin({
      ...login,
      [name]: value,
    });
  };

  const handleLogin = async (receivedUser: ILoginUser) => {
    const apiResponse = await LoginHelper(receivedUser);
    setResponse(apiResponse);
    if (apiResponse.token) {
      setToken(apiResponse.token);
      localStorage.setItem('token', apiResponse.token);
    }
    if (apiResponse.user) setUserLogged(apiResponse.user);
    closeLogin();
  };

  const handleLogout = () => {
    setResponse(null);
    setUserLogged(initialValues.userLogged);
    setToken(initialValues.token);
    localStorage.removeItem('token');
    setTasks(initialValues.tasks);
    setLogin(initialValues.login);
  };
  
  useEffect(() => {
    const validateUserLogged = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        const data = await ValidateHelper(storedToken);
        if (data.id) {
          const user = await GetUserHelper(storedToken, data.id);
          setUserLogged(user);
          setTasks(user.tasks);          
        }
      }
    };
    validateUserLogged();
  }, []);

  const contextValues = {
    users,
    userLogged,
    tasks,
    login,
    response,
    token,
    isLoginOpen,
    setUsers,
    setLogin,
    handleChange,
    handleLogin,
    handleLogout,
    openLogin,
    closeLogin,
  };

  return (
    <TodoContext.Provider value={ contextValues }>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
