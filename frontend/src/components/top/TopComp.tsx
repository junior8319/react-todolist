import logoCoopers from '../../assets/images/logoCoopers.svg';
import { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import IContext from '../../interfaces/IContext';
import styles from './topStyles.module.scss';
import { Link, useNavigate } from 'react-router-dom';

const TopComp = () => {
  const navigate = useNavigate();
  const { openLogin, userLogged, handleLogout } = useContext(TodoContext) as IContext;

  return (
    <header>
      <Link to='/'>
        <img
          src={ logoCoopers }
          alt={`Imagem de logotipo constituído por seta verde (sinal de menor)
            apontando para a esquerda e a palavra coopers em letras minúsculas`}
        />  
      </Link>
      {
        (!userLogged)
        ?
        <div className={ styles['top-buttons'] }>
          <button
          onClick={ openLogin }
          >
            sign in
          </button>
          <button
            onClick={ () => navigate('/users') }
          >
            sign up
          </button>
        </div>
        :
        <div>
          <span>Hello, { userLogged.name }</span>
          <button
            className={ styles.logoutButton }
            onClick={ handleLogout }
          >
            x
          </button>
        </div>
      }
    </header>
  );
};

export default TopComp;
