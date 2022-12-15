import styles from './login.module.scss';
import loginImg from '../../assets/images/loginImg.svg'
import { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import IContext from '../../interfaces/IContext';
import { Navigate } from 'react-router-dom';

const LoginComp = () => {
  const { userLogged, login, response, handleChange, handleLogin, closeLogin } = useContext(TodoContext) as IContext;

  const handleSubmit = (event: any) => {
    event.preventDefault();

    handleLogin(login);
  };

  if (!userLogged) {
    return (
      <main className={ styles.container }>
        <section className={ styles['section-hero'] }>
          <div className={ styles['hero-button'] }>
            <button
              className={ styles['button-close'] }
              onClick={ closeLogin }
            >
              close
            </button>
          </div>
          <div className={ styles['hero-content'] }>
            <div className={ styles['hero-img'] }>
              <img src={ loginImg } alt="" />
            </div>
            <div className={ styles['hero-message'] }>
              <h1>Sign in</h1>
              <h3>to access your list</h3>
            </div>
          </div>
        </section>
        <form className={ styles['login-form'] }>
          <label htmlFor="emailInput">Email:</label>
          <input
            type="text"
            id="emailInput"
            name="email"
            onChange={ (event) => handleChange(event) }
            value={ login.email }
            />
          
          <label htmlFor="passInput">Password:</label>
          <input
            type="password"
            id="passInput"
            name="password"
            onChange={ (event) => handleChange(event) }
            value={ login.password }
          />
          <div className={ styles['login-buttons'] }>
            <button
              type="submit"
              className={ styles['button-signin'] }
              onClick={ (event) => handleSubmit(event) }
            >
              Sign in
            </button>
    
            <button
            className={ styles['button-signup'] }
              type="submit"
            >
              Sign up
            </button>
          </div>
        </form>
        { (response) &&
          <section className={ styles['error-section'] }>
            <h2>Error: </h2>
            <h3>Status: </h3>
            <span>{ response.status }</span>
            <h3>Message: </h3>
            <span>{ response.message }</span>
          </section>
        }
      </main>
    );
  }
  
  return <Navigate to='/' replace={true} />
};

export default LoginComp;
