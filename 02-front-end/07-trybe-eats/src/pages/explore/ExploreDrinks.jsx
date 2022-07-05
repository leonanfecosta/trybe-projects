import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../../styles/ExploreDrinks.module.css';
import { getRandomDrink } from '../../services/drinkApi';
import cocktail from '../../styles/image/cocktail.png';

function ExploreDrinks() {
  const history = useHistory();
  return (
    <div className={ styles.explore }>
      <Header title="Explore Drinks" showButton={ false } route="null" />
      <nav>
        <Link to="/explore/drinks/ingredients">
          <button
            type="button"
            data-testid="explore-by-ingredient"
            className={ styles.button }
          >
            By Ingredient
          </button>
        </Link>
        <button
          type="button"
          data-testid="explore-surprise"
          className={ styles.button }
          onClick={ async () => {
            const { idDrink } = await getRandomDrink();
            history.push(`/drinks/${idDrink}`);
          } }
        >
          Surprise me!
        </button>
      </nav>
      <img src={ cocktail } alt="cocktail" className={ styles.cocktail } />
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
