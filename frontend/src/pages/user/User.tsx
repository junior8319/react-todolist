import { useContext } from 'react';
import RegisterUser from '../../components/register/RegisterUser';
import { TodoContext } from '../../context/TodoContext';
import IContext from '../../interfaces/IContext';
import TopComp from '../../components/top/TopComp';
import UserTasksPanel from '../../components/dashboard/UserTasksPanel';
import Modal from 'react-modal';
import LoginComp from '../../components/login/LoginComp';
import styles from '../home.module.scss';

const User = () => {
  const {
    userLogged,
    isLoginOpen,
    closeLogin
  } = useContext(TodoContext) as IContext;
  
  return (
    <>
      <TopComp />
      <Modal
        isOpen={isLoginOpen}
        onRequestClose={closeLogin}
        contentLabel="Login Modal"
        overlayClassName={ styles['modal-overlay'] }
        className={ styles['login-modal-content'] }
      >
        <LoginComp />
      </Modal>
      {
        userLogged
        ?
          <UserTasksPanel />
        :
          <RegisterUser />
      }
    </>
    
  );
};

export default User;
