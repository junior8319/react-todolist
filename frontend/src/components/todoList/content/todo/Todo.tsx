import { useContext } from 'react';
import { TodoContext } from '../../../../context/TodoContext';
import IContext from '../../../../interfaces/IContext';
import ITask from '../../../../interfaces/ITask';
import styles from './todo.module.scss';
import todoBorder from '../../../../assets//images/todoCardTopBorder.svg';

const Todo = () => {
  const { tasks } = useContext(TodoContext) as IContext;

  const isUnconcluded = (task: ITask) => {
    if (task.status === 'inProgress' || task.status === 'awaiting') return task;
  };

  const unconcludeds = tasks.filter(task => isUnconcluded(task));

  return (
    <section className={ styles['todo-card'] }>
      <div className={ styles['card-img'] }>
        <img src={ todoBorder } alt="Uma barra fina na cor laranja formando a borda superior da seção." />
      </div>
      <article className={ styles['card-message'] }>
        <h1>To-do</h1>
        <h3>Take a breath.</h3>
        <h3>Start doing.</h3>
      </article>
        {
          (unconcludeds && unconcludeds.length > 0)
          ?
          <article className={ styles['card-tasks-list'] } >        
            { unconcludeds.map((task) => (
              <label key={ Math.round(Math.random() * 1000000) }>
                <input type='checkbox' />
                <span  className={ styles['todo-label'] }>{ task.title }</span>
                <span className={ styles['todo-check'] }></span>
              </label>
            )) }
          </article>
        :
        <article className={ styles['card-tasks-list'] }>        
          <label>
            <input type='checkbox' />
            <span  className={ styles['todo-label'] }>here will display to-do tasks</span>
            <span className={ styles['todo-check'] }></span>
          </label>
        </article>
      }
      <div className={ styles['erase-button'] }>
        <button>erase all</button>
      </div>
    </section>
  );
};

export default Todo;
