import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import styles from '../styles/Footer.module.css';

function Footer() {
  const history = useHistory();

  return (
    <footer data-testid="footer" className={ styles.footer }>
      <input
        type="image"
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
        src={ drinkIcon }
        alt="drinkIcon"
      />
      <input
        type="image"
        data-testid="explore-bottom-btn"
        onClick={ () => history.push('/explore') }
        src={ exploreIcon }
        alt="exploreIcon"
      />
      <input
        type="image"
        data-testid="food-bottom-btn"
        onClick={ () => history.push('/foods') }
        src={ mealIcon }
        alt="mealIcon"
      />
    </footer>
  );
}

export default Footer;
