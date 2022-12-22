import styles from './userPanel.module.scss';
import Todo from '../todoList/content/todo/Todo';
import Done from '../todoList/content/done/Done';
import TasksForm from '../forms/Tasks.form';

const UserTasksPanel = () => {
  return (
    <main className={ styles['panel-container'] }>
      <TasksForm />
      <Todo />
      <Done />
    </main>
  );
};

export default UserTasksPanel;
