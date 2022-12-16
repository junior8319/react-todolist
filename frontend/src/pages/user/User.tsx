import { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import IContext from '../../interfaces/IContext';

const User = () => {
  const { userLogged } = useContext(TodoContext) as IContext;
  return (
    (userLogged)
    ?
      <h1>Hello, { userLogged?.name }</h1>
    :
      <h1>Register page</h1>
  );
};

export default User;
