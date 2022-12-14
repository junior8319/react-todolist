import styles from './goodThings.module.scss';
import Carousel from "../carousel/Carousel";

const GoodThings = () => {
  return (
    <main className={ styles['good-things-container'] }>
      <section className={ styles['good-things-title'] }>
        <h1>good things</h1>
      </section>
      <Carousel />
    </main>
  );
};

export default GoodThings;
