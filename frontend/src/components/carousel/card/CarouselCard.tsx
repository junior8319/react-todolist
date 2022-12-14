import styles from './carouselCard.module.scss';
import logo from '../images/coopersLogo.svg';

const CarouselCard = (props: any) => {
  const { cardData } = props;
  
  if (cardData) {
    const { image, title, tags } = cardData;
    return (
      <>
        <article
          className={ styles['card-carousel-container'] }
          key={ `${title}${Math.round(Math.random() * 100000)}` }
        >
          <div
            className={ styles['card-carousel'] }
            id={ `${title}` }
            key={ `${title}${Math.round(Math.random() * 100000)}` }
          >
            <img src={ image } alt={ `Ilustration for ${title}` }/>
            <img src={ logo } alt="Coopers logo." className={ styles['coopers-logo'] } />
            <div className={ styles.tags }>
              { tags.map((tag: string) => <span key={ `${tag}${Math.round(Math.random() * 100000)}` }>{tag}</span>) }
            </div>
            <h1>{ title }</h1>
          </div>
        </article>
      </>
    );
  }

  return <h1>No good things to show</h1>
};

export default CarouselCard;
