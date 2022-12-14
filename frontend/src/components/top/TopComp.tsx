import logoCoopers from '../../assets/images/logoCoopers.svg';
import { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import IContext from '../../interfaces/IContext';
import styles from './topStyles.module.scss';

const TopComp = () => {
  const { openLogin, userLogged, handleLogout } = useContext(TodoContext) as IContext;

  return (
    <header>
      <img
        src={ logoCoopers }
        alt={`Imagem de logotipo constituído por seta verde (sinal de menor)
          apontando para a esquerda e a palavra coopers em letras minúsculas`}
      />
      {
        (!userLogged)
        ?
        <button
         onClick={ openLogin }
        >
          sign in
        </button>
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
