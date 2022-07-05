import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/RecomendationsCard.module.css';

function RecomendationsCard({ srcImg, alt, name, index }) {
  return (
    <div
      data-testid={ `${index}-recomendation-card` }
      className={ styles.recomendationCard }
    >
      <p data-testid={ `${index}-recomendation-title` }>{ name }</p>
      <img src={ srcImg } alt={ alt } />
    </div>
  );
}

RecomendationsCard.propTypes = {
  srcImg: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecomendationsCard;
