import { useState, useContext } from 'react';
import { status } from '../../enums/Task';
import { TodoContext } from '../../context/TodoContext';
import IContext from '../../interfaces/IContext';

const EditTaskForm = (props: any) => {
  const [inEditionTask, setInEditionTask] = useState(props.task);
  const { handleEditTask, setIsEditing } = useContext(TodoContext) as IContext;
  console.log(inEditionTask.title);
  

  const handleChange = (event: any) => {
    const { name, value } = event.target;    

    setInEditionTask({
      ...inEditionTask,
      [name]: value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    handleEditTask(inEditionTask);
    setInEditionTask({
      title: '',
      description: '',
      status: '',
      updatedAt: '',
    });
    setIsEditing(false);
  };
  return (
    <main>
      <section>
        <article>
          <h1>Edit your task</h1>
        </article>

        <article>
          <form>
            <article>
              <label htmlFor="title-edit-input">Title: </label>
              <input
                type="text"
                id="title-edit-input"
                name="title"
                onChange={ (event) => handleChange(event) }
                value={ inEditionTask.title }
              />
            </article>

            <article>
              <label htmlFor="desc-edit-input">Description: </label>
              <textarea
                id="desc-edit-input"
                name="description"
                onChange={ (event) => handleChange(event) }
                value={ inEditionTask.description }
              />
            </article>
          
            <article>
              <label htmlFor="status-edit-select">Status: </label>
              <select
                name="status"
                id="status-edit-select"
                onChange={ (event) => handleChange(event) }
                value={ inEditionTask.status }
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

          <div>
            <button
              onClick={ (event) => handleSubmit(event) }
            >
              Save
            </button>
            <button>Cancel</button>
          </div>
        </article>
      </section>
    </main>
  );
};

export default EditTaskForm;
