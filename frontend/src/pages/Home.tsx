import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import styles from './home.module.scss';
import IContext from '../interfaces/IContext';
import Hero from '../components/hero/Hero';
import TodoList from '../components/todoList/TodoList';
import GoodThings from '../components/good-things/GoodThings';
import Modal from 'react-modal';
import LoginComp from '../components/login/LoginComp';

Modal.setAppElement('#root');

const Home = () => {
  const { isLoginOpen, closeLogin } = useContext(TodoContext) as IContext;
  return (
    <>
      <Modal
        isOpen={isLoginOpen}
        onRequestClose={closeLogin}
        contentLabel="Login Modal"
        overlayClassName={ styles['modal-overlay'] }
        className={ styles['login-modal-content'] }
      >
        <LoginComp />
      </Modal>

      <Hero />

      <TodoList />

      <GoodThings />
    </>
  );
};

export default Home;
