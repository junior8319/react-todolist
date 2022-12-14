import styles from './carousel.module.scss';
import cardOneImg from './images/cardOne.svg';
import cardTwoImg from './images/cardTwo.svg';
import cardThreeImg from './images/cardThree.svg';
import logo from './images/coopersLogo.svg';
import { useRef } from 'react';
import CarouselCard from './card/CarouselCard';

const cardOne = {
  image: cardOneImg,
  tags: ['function'],
  title: 'Organize your daily job enhance your life performance',
  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate assumenda vero id quam ratione voluptas iure amet atque aliquam, aperiam et modi architecto illum aliquid libero iusto? Reprehenderit, saepe suscipit?',
};

const cardTwo = {
  image: cardTwoImg,
  tags: ['function'],
  title: 'Mark one activity as done makes your brain understands the power of doing.',
  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate assumenda vero id quam ratione voluptas iure amet atque aliquam, aperiam et modi architecto illum aliquid libero iusto? Reprehenderit, saepe suscipit?',
};

const cardThree = {
  image: cardThreeImg,
  tags: ['function'],
  title: 'Careful with missunderstanding the difference between a list of things and a list of desires.',
  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate assumenda vero id quam ratione voluptas iure amet atque aliquam, aperiam et modi architecto illum aliquid libero iusto? Reprehenderit, saepe suscipit?',
};

const listOfData = [cardOne, cardTwo, cardThree];

const Carousel = () => {
  const carousel = useRef <HTMLDivElement | null>(null);

  const handleClickNext = (event: any, current: HTMLDivElement | null) => {
    event.preventDefault();
    if (current) current.scrollLeft += current?.offsetWidth;
  };
  
  const handleClickPrevious = (event: any, current: HTMLDivElement | null) => {
    event.preventDefault();
    if (current) current.scrollLeft -= current?.offsetWidth;
  };

  return (
    <>
      <section className={ styles['carousel-container'] }  ref={ carousel }>
        { listOfData.map((cardData) => (
        <CarouselCard cardData={ cardData } key={ cardData.title }/>
        )) }
      </section>
      <div className={ styles['navigation-section'] }>
        <button
          className={ styles['button-previous'] }
          onClick={ (event) => handleClickPrevious(event, carousel.current) }
          >
          <img src={ logo } alt="Coopers logo as left arrow" />
        </button>
        
        <button
          className={ styles['button-next'] }
          onClick={ (event) => handleClickNext(event, carousel.current) }
        >
          <img src={ logo } alt="Coopers logo as right arrow" />
        </button>
      </div>
    </>
  );
};

export default Carousel;
