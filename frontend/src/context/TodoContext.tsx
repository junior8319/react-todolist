/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from 'react';
import { ILoginUser } from '../interfaces/ILogin';
import ITask from '../interfaces/ITask';
import IUser, { IRegistering } from '../interfaces/IUser';
import LoginHelper from '../helpers/Login.helper';
import IContext from '../interfaces/IContext';
import IError from '../interfaces/IError';
import IToken from '../interfaces/IToken';
import ValidateHelper from '../helpers/Validate..helper';
import GetUserHelper from '../helpers/GetUser.helper';
import RegisterUserHelper from '../helpers/RegisterUser.helper';
import { useNavigate } from 'react-router-dom';

export const initialValues = {
  inRegistrationUser: {
    name: '',
    email: '',
    password: '',
    telephone: null,
  },
  setInRegistrationUser: (newState: string) => {},
  users: [],
  setUsers: (newState: IUser[]) => {},
  token: null,
  validToken: false,
  setToken: (newState: string) => {},
  userLogged: null,
  response: null,
  setResponse: (newState: IError | null) => {},
  setUserLogged: (newState: string) => {},
  tasks: [],
  setTasks: (newState: string) => {},
  login: { email: '', password: '' },
  handleChange: (event: any) => {},
  handleRegisterChange: (event: any) => {},
  handleLogin: (event: any) => {},
  handleLogout: (event: any) => {},
  handleRegister: (event: any) => {},
  isLoginOpen: false,
  openLogin: () => {},
  closeLogin: () => {},
};

export const TodoContext = createContext<IContext | null>(initialValues);

const TodoProvider = ({ children }: any) => {
  const navigate = useNavigate();

  const [inRegistrationUser, setInRegistrationUser] = useState<IRegistering>(initialValues.inRegistrationUser);
  const [users, setUsers] = useState<IUser[]>(initialValues.users);
  const [userLogged, setUserLogged] = useState<IUser | null>(initialValues.userLogged);
  const [tasks, setTasks] = useState<ITask[] |  []>(initialValues.tasks);
  const [login, setLogin] = useState<ILoginUser>(initialValues.login);
  const [response, setResponse] = useState<IError | null>(initialValues.response);
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
  
  const handleRegisterChange = (event: any) => {
    const { name, value } = event.target;

    setInRegistrationUser({
      ...inRegistrationUser,
      [name]: value,
    });

  };

  const handleLogin = async (receivedUser: ILoginUser) => {
    const apiResponse = await LoginHelper(receivedUser);
    if (apiResponse.token) {
      setToken(apiResponse.token);
      localStorage.setItem('token', apiResponse.token);
    }
    
    if (apiResponse.user) {
      setUserLogged(apiResponse.user);
      setLogin(initialValues.login);
      setResponse(null);
      closeLogin();
      navigate('/users');
    }
    setResponse(apiResponse);
  };

  const handleLogout = () => {
    setResponse(null);
    setUserLogged(initialValues.userLogged);
    setToken(initialValues.token);
    localStorage.removeItem('token');
    setTasks(initialValues.tasks);
    setLogin(initialValues.login);
  };

  const handleRegister = async (receivedUser: IRegistering) => {
    const apiResponse = await RegisterUserHelper(receivedUser);
    if (apiResponse.token) {
      setToken(apiResponse.token);
      localStorage.setItem('token', apiResponse.token);
    }

    if (apiResponse.user) {
      setUserLogged(apiResponse.user);
      setResponse(null);
      setInRegistrationUser(initialValues.inRegistrationUser);
    }
    console.log(apiResponse);
    
    setResponse(apiResponse);
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
    inRegistrationUser,
    users,
    userLogged,
    tasks,
    login,
    response,
    token,
    isLoginOpen,
    setInRegistrationUser,
    setUsers,
    setLogin,
    handleChange,
    handleRegisterChange,
    handleLogin,
    handleLogout,
    handleRegister,
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
