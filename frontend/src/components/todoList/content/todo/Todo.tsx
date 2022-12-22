/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import ITask from '../../../../interfaces/ITask';
import styles from './todo.module.scss';
import todoBorder from '../../../../assets//images/todoCardTopBorder.svg';
import EditTaskForm from '../../../forms/EditTask.form';
import { TodoContext } from '../../../../context/TodoContext';
import IContext from '../../../../interfaces/IContext';

const initialEditingTask: ITask = {
  title: '',
  description: '',
  status: '',
};

const Todo = () => {
  const [toEditTask, setToEditTask] = useState<ITask>(initialEditingTask);
  const { unconcludeds, isEditing, setIsEditing } = useContext(TodoContext) as IContext;
  
  return (
    <>
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
              {
                (isEditing) 
                ?
                  <EditTaskForm task={ toEditTask }/>
                :
                unconcludeds.map((task) => (
                  <label key={ Math.round(Math.random() * 1000000) }>
                    <input type='checkbox' />
                    <span  className={ styles['todo-label'] }>{ task.title }</span>
                    <span className={ styles['todo-check'] }></span>
                    <button
                      onClick={ () => {
                        setToEditTask(task);
                        setIsEditing(true);
                      } }
                    >
                      <AiFillEdit color='#E88D39'/>
                    </button>
                    <button><AiFillDelete color='#ff5c15'/></button>
                  </label>
                ))
              }
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
    </>
  );
};

export default Todo;
