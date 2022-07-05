import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FoodContext from '../../context/FoodContext';
import styles from '../../styles/ExploreDrinksIngredients.module.css';
import { getIngredients } from '../../services/drinkApi';

function ExploreDrinksIngredients() {
  const [drinks, setDrinks] = useState([]);
  const { setIngredientDrink } = useContext(FoodContext);

  useEffect(() => {
    getIngredients().then((recipe) => {
      const array = [];
      const twelve = 12;
      for (let i = 0; i < twelve; i += 1) {
        array.push(recipe[i].strIngredient1);
      }
      setDrinks(array);
    });
  }, []);

  const onClickLink = (ingredient) => {
    setIngredientDrink(ingredient);
  };

  return (
    <div>
      <Header title="Explore Ingredients" showButton={ false } route="null" />
      <main className={ styles.cardContainer }>
        {drinks.map((e, index) => (
          <Link key={ index } to="/drinks" onClick={ () => onClickLink(e) }>
            <div
              key={ index }
              data-testid={ `${index}-ingredient-card` }
              className={ styles.exploreDrinksIngredients }
            >
              <p data-testid={ `${index}-card-name` }>{ e }</p>
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.thecocktaildb.com/images/ingredients/${e}-Small.png` }
                alt={ e }
              />
            </div>
          </Link>
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default ExploreDrinksIngredients;
