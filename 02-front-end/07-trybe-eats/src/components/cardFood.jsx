import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/cardFood.module.css';

function CardFood({
  dataTestIdCard,
  dataTestIdImg,
  dataTestIdName,
  srcImg,
  alt,
  name,
  route,
  id,
}) {
  const verifyRoute = () => {
    if (route === 'food') {
      return `/foods/${id}`;
    }
    if (route === 'drink') {
      return `/drinks/${id}`;
    }
  };

  return (
    <a href={ verifyRoute() }>
      <div data-testid={ dataTestIdCard } className={ styles.cardFood }>
        <p data-testid={ dataTestIdName }>{name}</p>
        <img src={ srcImg } alt={ alt } data-testid={ dataTestIdImg } />
      </div>
    </a>
  );
}

CardFood.propTypes = {
  dataTestIdCard: PropTypes.string.isRequired,
  dataTestIdImg: PropTypes.string.isRequired,
  dataTestIdName: PropTypes.string.isRequired,
  srcImg: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default CardFood;
