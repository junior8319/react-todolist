import { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import IContext from '../../interfaces/IContext';
import styles from './userPanel.module.scss';
import Todo from '../todoList/content/todo/Todo';
import Done from '../todoList/content/done/Done';

const UserTasksPanel = () => {
  const { userLogged } = useContext(TodoContext) as IContext;
  return (
    <main className={ styles['panel-container'] }>
      <Todo />
      <Done />
    </main>
  );
};

export default UserTasksPanel;
