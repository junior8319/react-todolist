import styles from './content.module.scss';
import Todo from './todo/Todo';
import Done from './done/Done';

const Content = () => {
  return (
    <main className={ styles['todo-content-container'] }>
      <Todo />
      <Done />
    </main>
  );
};

export default Content;
