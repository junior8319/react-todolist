import { useContext } from 'react';
import loginImg from '../../assets/images/loginImg.svg';
import { TodoContext } from '../../context/TodoContext';
import IContext from '../../interfaces/IContext';
import styles from './registerUser.module.scss';
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
    <main className={ styles['register-container'] }>
      <section className={ styles['register-hero'] }>
        <article className={ styles['register-hero-image'] }>
          <img
            src={ loginImg }
            alt="Drawing of a standing person interacting with geometric forms (rectangle and circle)"
          />
        </article>
        <article className={ styles['register-hero-message'] }>
          <h1>Sign up</h1>
          <h3>to enjoy this application</h3>
        </article>
      </section>

      <form className={ styles['register-form'] }>
        <article>
          <label htmlFor="nameInput">Name:</label>
          <input
            type="text"
            name="name"
            id="nameInput"
            onChange={ (event) => handleRegisterChange(event) }
            value={ inRegistrationUser.name }
          />
        </article>

        <article>
          <label htmlFor="">Email:</label>
          <input
            type="text"
            name="email"
            id="emailInput"
            onChange={ (event) => handleRegisterChange(event) }
            value={ inRegistrationUser.email }
          />
        </article>
        <article>
          <label htmlFor="passwordInput">Password:</label>
          <input
            type="password"
            name="password"
            id="passwordInput"
            onChange={ (event) => handleRegisterChange(event) }
            value={ inRegistrationUser.password }
          />
        </article>

        <article>
          <label htmlFor="telephoneIput">Telephone:</label>
          <input
            type="number"
            name="telephone"
            id="telephoneInput"
            onChange={ (event) => handleRegisterChange(event) }
            value={ (inRegistrationUser.telephone) ? inRegistrationUser.telephone : '' }
          />
        </article>
      </form>

      <section className={ styles['register-buttons'] }>
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
