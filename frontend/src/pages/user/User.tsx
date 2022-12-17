import { useContext } from 'react';
import RegisterUser from '../../components/register/RegisterUser';
import { TodoContext } from '../../context/TodoContext';
import IContext from '../../interfaces/IContext';
import TopComp from '../../components/top/TopComp';

const User = () => {
  const { userLogged } = useContext(TodoContext) as IContext;
  
  return (
    <>
      <TopComp />
      {
        userLogged
        ?
          <h1>Hello, {userLogged.name}!</h1>
        :
        <RegisterUser />
      }
    </>
    
  );
};

export default User;
