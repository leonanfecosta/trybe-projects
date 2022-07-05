import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../../styles/ExploreFoods.module.css';
import { getRandomMeal } from '../../services/mealApi';
import turkey from '../../styles/image/turkey.png';

function ExploreFoods() {
  const history = useHistory();
  return (
    <div className={ styles.explore }>
      <Header title="Explore Foods" showButton={ false } route="null" />
      <nav>
        <Link to="/explore/foods/ingredients">
          <button
            type="button"
            data-testid="explore-by-ingredient"
            className={ styles.button }
          >
            By Ingredient
          </button>
        </Link>
        <Link to="/explore/foods/nationalities">
          <button
            type="button"
            data-testid="explore-by-nationality"
            className={ styles.button }
          >
            By Nationality
          </button>
        </Link>
        <button
          type="button"
          data-testid="explore-surprise"
          className={ styles.button }
          onClick={ async () => {
            const { idMeal } = await getRandomMeal();
            history.push(`/foods/${idMeal}`);
          } }
        >
          Surprise me!
        </button>
      </nav>
      <img src={ turkey } alt="turkey" className={ styles.turkey } />
      <Footer />
    </div>
  );
}

export default ExploreFoods;
