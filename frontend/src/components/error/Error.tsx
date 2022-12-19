import { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import IContext from '../../interfaces/IContext';
import styles from './error.module.scss';

const ErrorComp = () => {
  const { response } = useContext(TodoContext) as IContext;

  if (!response || !response.status || !response.message) {
    return <div></div>;
  }
  return (
    <section className={ styles['error-section-container'] }>
      <article className={ styles['error-section-article'] }>
        <h2>Error: </h2>
        <h3>Status: <span>{ response.status }</span></h3>
        <h3>Message: <span>{ response.message }</span></h3>
      </article>
    </section>
  );
};

export default ErrorComp;
