import TopComp from '../top/TopComp';
import heroImage from '../../assets/images/heroImage.svg';
import styles from './hero.module.scss';

const Hero = () => {
  return (
    <main className={ styles.container }>
      <TopComp />
      <section className={ styles['hero-title-section'] }>
        <h1>Organize</h1>
        <h3>your daily jobs</h3>
        <p>The only way to get things done</p>
        <button>
          Go to To-do list
        </button>
      </section>
      <section className={ styles['hero-img-section'] }>
        <img
          src={ heroImage }
          alt={`A foto de parte de uma sala com uma mesa tipo bar, escrivaninha
              e banco. Tema amadeirado em parede e porta e iluminação dourada.`}
        />
      </section>
    </main>
  );
};

export default Hero;
