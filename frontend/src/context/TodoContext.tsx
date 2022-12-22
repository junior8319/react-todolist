/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from 'react';
import { ILoginUser } from '../interfaces/ILogin';
import ITask from '../interfaces/ITask';
import IUser, { IRegistering } from '../interfaces/IUser';
import LoginHelper from '../helpers/Login.helper';
import IContext from '../interfaces/IContext';
import IError from '../interfaces/IError';
import IToken from '../interfaces/IToken';
import ValidateHelper from '../helpers/Validate.helper';
import GetUserHelper from '../helpers/GetUser.helper';
import RegisterUserHelper from '../helpers/RegisterUser.helper';
import { useNavigate } from 'react-router-dom';
import RegisterTaskHelper from '../helpers/RegisterTask.helper';
import EditTaskHelper from '../helpers/EditTask.helper';

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
  task: {
    title: '',
    description: '',
    status: 'awaiting',
  },
  setTask: (newState: string) => {},
  tasks: [],
  unconcludeds: [],
  setTasks: (newState: ITask[] | []) => {},
  isEditing: false,
  setIsEditing: (newState: boolean) => {},
  login: { email: '', password: '' },
  handleChange: (event: any) => {},
  handleRegisterChange: (event: any) => {},
  handleTaskChange: (event: any) => {},
  handleLogin: (event: any) => {},
  handleLogout: (event: any) => {},
  handleRegister: (event: any) => {},
  handleSendTask: (event: any) => {},
  handleEditTask: (event: any) => {},
  isLoginOpen: false,
  openLogin: () => {},
  closeLogin: () => {},
};

export const TodoContext = createContext<IContext | null>(initialValues);

const TodoProvider = ({ children }: any) => {
  const navigate = useNavigate();

  const [inRegistrationUser, setInRegistrationUser] = useState<IRegistering>(initialValues.inRegistrationUser);
  const [isEditing, setIsEditing] = useState<boolean>(initialValues.isEditing);
  const [users, setUsers] = useState<IUser[]>(initialValues.users);
  const [userLogged, setUserLogged] = useState<IUser | null>(initialValues.userLogged);
  const [task, setTask] = useState<ITask>(initialValues.task);
  const [tasks, setTasks] = useState<ITask[] |  []>(initialValues.tasks);
  const [unconcludeds, setUnconcludeds] = useState<ITask[] | []>(initialValues.unconcludeds);
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

  const handleTaskChange = (event: any) => {
    const { name, value } = event.target;

    setTask({
      ...task,
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
    
    setResponse(apiResponse);
  };
  
  const isUnconcluded = (task: ITask) => {
    if (task.status === 'in progress' || task.status === 'awaiting') return task;
  };


  const filterUnconcludeds = () => tasks.filter(task => {
    console.log(task);
    
    return isUnconcluded(task)
  });
  
  const handleSendTask = async (receivedTask: ITask) => {
    const apiResponse = await RegisterTaskHelper(receivedTask, token?.token);
    if(apiResponse.task) {
      setTasks([...tasks, apiResponse.task]);
      setTask(initialValues.task);
      setResponse(initialValues.response);
      setUnconcludeds(filterUnconcludeds());
    }
    
    setResponse(apiResponse);
  };

  const handleEditTask = async (receivedTask: ITask) => {
    const apiResponse = await EditTaskHelper(receivedTask, token?.token);
    if (apiResponse.task) {
      setTasks([...tasks, apiResponse.task]);
    }
    
    setResponse(apiResponse);
  };
  
  useEffect(() => {
    const validateUserLogged = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken({
          ...token,
          token: storedToken,
        });
        const data = await ValidateHelper(storedToken);
        if (data.id) {
          const user = await GetUserHelper(storedToken, data.id);
          setUserLogged(user);
          setTasks(user.tasks);
          setUnconcludeds(filterUnconcludeds());
        }
      }
    };
    validateUserLogged();
  }, []);
  
  const getUserTasks = async () => {
    if (token && token.token && userLogged) {
        const { tasks } = await GetUserHelper(token.token, userLogged.id);
    
        if (tasks) setTasks(tasks);
      }
  };

  useEffect(() => {
    getUserTasks();
  }, [isEditing]);

  useEffect(() => {
    setUnconcludeds(filterUnconcludeds());
  }, [tasks]);
  

  useEffect(() => {
    console.log('HERE');
     
  }, [unconcludeds, isEditing, tasks]);

  const contextValues = {
    inRegistrationUser,
    isEditing,
    users,
    userLogged,
    task,
    tasks,
    unconcludeds,
    login,
    response,
    token,
    isLoginOpen,
    setInRegistrationUser,
    setIsEditing,
    setUsers,
    setLogin,
    setTasks,
    handleChange,
    handleRegisterChange,
    handleLogin,
    handleLogout,
    handleRegister,
    handleSendTask,
    handleEditTask,
    handleTaskChange,
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
