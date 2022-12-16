import { useContext } from 'react';
import RegisterUser from '../../components/register/RegisterUser';
import { TodoContext } from '../../context/TodoContext';
import IContext from '../../interfaces/IContext';

const User = () => {
  const { userLogged } = useContext(TodoContext) as IContext;
  
  return (
    (userLogged)
    ?
      <h1>Hello, { userLogged?.name }</h1>
    :
      <RegisterUser />
  );
};

export default User;
