import doneBorder from '../../../../assets//images/doneCardTopBorder.svg';
import styles from './done.module.scss'
import { useContext } from 'react';
import { TodoContext } from '../../../../context/TodoContext';
import IContext from '../../../../interfaces/IContext';
import ITask from '../../../../../../backend/src/interfaces/ITask';

const Done = () => {
  const { tasks } = useContext(TodoContext) as IContext;

  const isComplete = (task: ITask) => {
    if (task.status === 'complete') return task;
  };

  const concludedTasks = tasks.filter(task => isComplete(task));

  return (
    <section className={ styles['done-card'] }>
      <div className={ styles['card-img'] }>
        <img src={ doneBorder } alt="Uma barra fina na cor laranja formando a borda superior da seção." />
      </div>
      <article className={ styles['card-message'] }>
        <h1>Done</h1>
        {
          (concludedTasks && concludedTasks.length > 0)
          ?
          <>
            <h3>Congratulations!</h3>
            <h3>You have done { concludedTasks.length } tasks.</h3>
          </>
          :
          <h3>Let's go.</h3>
        }
      </article>
      {
        (concludedTasks && concludedTasks.length > 0)
        ?
          <article className={ styles['card-tasks-list'] }>
            { concludedTasks.map(task => (
              <label key={ Math.round(Math.random() * 1000000) }>
                <input type='checkbox' />
                <span  className={ styles['done-label'] }>{ task.title }</span>
                <span className={ styles['done-check'] }></span>
              </label>
            )) } 
          </article>
        :
          <article className={ styles['card-tasks-list'] }>        
            <label>
              <input type='checkbox' />
              <span  className={ styles['done-label'] }>here will display to-do tasks</span>
              <span className={ styles['done-check'] }></span>
            </label>
          </article>
      }
      <div className={ styles['erase-button'] }>
        <button>erase all</button>
      </div>
    </section>
  );
};

export default Done;
