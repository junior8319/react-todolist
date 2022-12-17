import { useContext } from 'react';
import loginImg from '../../assets/images/loginImg.svg';
import { TodoContext } from '../../context/TodoContext';
import IContext from '../../interfaces/IContext';
import ErrorComp from '../error/Error';

const RegisterUser = () => {
  const {
    inRegistrationUser,
    response,
    handleRegisterChange,
    handleRegister,
  } = useContext(TodoContext) as IContext;

  const handleSubmit = (event: any) => {
    event.preventDefault();
    
    handleRegister(inRegistrationUser);
  };

  return (
    <main>
      <section>
        <article>
          <div>
            <img
              src={ loginImg }
              alt="Drawing of a standing person interacting with geometric forms (rectangle and circle)"
            />
          </div>
          <div>
            <h1>Sign up</h1>
            <h3>to enjoy this application</h3>
          </div>
        </article>
      </section>

      <form>
        <label htmlFor="nameInput">Name:</label>
        <input
          type="text"
          name="name"
          id="nameInput"
          onChange={ (event) => handleRegisterChange(event) }
          value={ inRegistrationUser.name }
          />

        <label htmlFor="">Email:</label>
        <input
          type="text"
          name="email"
          id="emailInput"
          onChange={ (event) => handleRegisterChange(event) }
          value={ inRegistrationUser.email }
        />

        <label htmlFor="passwordInput">Password:</label>
        <input
          type="password"
          name="password"
          id="passwordInput"
          onChange={ (event) => handleRegisterChange(event) }
          value={ inRegistrationUser.password }
        />

        <label htmlFor="telephoneIput">Telephone:</label>
        <input
          type="number"
          name="telephone"
          id="telephoneInput"
          onChange={ (event) => handleRegisterChange(event) }
          value={ (inRegistrationUser.telephone) ? inRegistrationUser.telephone : '' }
        />
      </form>

      <section>
        <button
          type="submit"
          onClick={ handleSubmit }
        >
          Send
        </button>
      </section>

      { (response) &&
        <ErrorComp />
      }
    </main>
  );
};

export default RegisterUser;
