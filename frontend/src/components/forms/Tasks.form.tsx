import styles from './tasksForm.module.scss';
import { status } from '../../enums/Task';
import { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import IContext from '../../interfaces/IContext';


const TasksForm = () => {
  const {
    userLogged,
    task,
    handleTaskChange,
    handleSendTask,
  } = useContext(TodoContext) as IContext;

  if (userLogged && userLogged.id) task.userId = userLogged.id;

  const handleSubmit = (event: any) => {
    event.preventDefault();

    handleSendTask(task);
  };

  return (
    <main className={ styles['tasks-form-container'] }>
      <form className={ styles['tasks-form'] }>
        <article>
          <label htmlFor="title-input">Title: </label>
          <input
            type="text"
            id="title-input"
            name="title"
            onChange={ (event) => handleTaskChange(event) }
            value={ task.title }
          />
        </article>

        <article>
          <label htmlFor="desc-input">Description: </label>
          <textarea
            id="desc-input"
            name="description"
            onChange={ (event) => handleTaskChange(event) }
            value={ task.description }
          />
        </article>
          
        <article>
          <label htmlFor="status-select">Status: </label>
          <select
            name="status"
            id="status-select"
            onChange={ (event) => handleTaskChange(event) }
            value={ task.status }
          >
            { status.map(stringStatus => {
              return (
                <option
                  value={ stringStatus }
                  key={ stringStatus }
                >
                  { stringStatus }
                </option>
              );
            }) }
          </select>
        </article>
      </form>

      <section>
        <button
          type="submit"
          onClick={ (event) => handleSubmit(event) }
        >
          Send
        </button>
      </section>
    </main>
  );
};

export default TasksForm;
