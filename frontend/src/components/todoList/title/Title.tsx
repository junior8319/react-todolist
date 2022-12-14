import styles from './title.module.scss'
import pathSix from '../../../assets/images/todoListPathSixLine.svg'

const Title = () => {
  return (
    <section className={ styles['todo-list-title-section'] }>
      <article className={ styles['todo-list-title1-article'] }>
        <h1>To-do List</h1>
        <img src={ pathSix } alt="Uma linha verde que separa o título do prágrafo de sugestão" />
        <p>
          Drag and drop to set your main priorities,
           check when done and create what's new.
        </p>
      </article>
    </section>
  );
};

export default Title;
