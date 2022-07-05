import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FoodContext from '../../context/FoodContext';
import styles from '../../styles/ExploreFoodsIngredients.module.css';
import { getIngredients } from '../../services/mealApi';

function ExploreFoodsIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const { setIngredient } = useContext(FoodContext);

  useEffect(() => {
    getIngredients().then((recipe) => {
      const array = [];
      const twelve = 12;
      for (let i = 0; i < twelve; i += 1) {
        array.push(recipe[i].strIngredient);
      }
      setIngredients(array);
    });
  }, []);

  const onClickLink = (ingredient) => {
    setIngredient(ingredient);
  };

  return (
    <div>
      <Header title="Explore Ingredients" showButton={ false } route="null" />
      <main className={ styles.cardContainer }>
        {ingredients.map((e, index) => (
          <Link key={ index } to="/foods" onClick={ () => onClickLink(e) }>
            <div
              key={ index }
              data-testid={ `${index}-ingredient-card` }
              className={ styles.exploreFoodsIngredients }
            >
              <p data-testid={ `${index}-card-name` }>{ e }</p>
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.themealdb.com/images/ingredients/${e}-Small.png` }
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

export default ExploreFoodsIngredients;
