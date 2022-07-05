import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeDetails from '../components/RecipeDetails';
import { getDrinkById } from '../services/drinkApi';
import { getMeals } from '../services/mealApi';
import styles from '../styles/RecipeDetailsDrinks.module.css';

function RecipeDetailsDrinks(props) {
  const [drink, setDrink] = useState({});
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const { match: { params: { id } } } = props;

  useEffect(() => {
    getDrinkById(id)
      .then((recipe) => {
        recipe.ingredients = [];
        const TWENTY = 20;
        for (let i = 1; i <= TWENTY; i += 1) {
          const ingredient = `strIngredient${i}`;
          const measure = `strMeasure${i}`;
          if (recipe[ingredient] !== ''
          && recipe[measure] !== ''
          && recipe[ingredient] !== null
          && recipe[measure] !== null
          && recipe[ingredient] !== undefined
          && recipe[measure] !== undefined) {
            recipe.ingredients.push(`${recipe[ingredient]} - ${recipe[measure]}`);
          }
        }
        setDrink(recipe);
      });
    getMeals().then((response) => {
      const TOTAL_RECOMENDATIONS = 6;
      const responseFilter = response.filter((_, index) => index < TOTAL_RECOMENDATIONS);
      setMeals(responseFilter);
    });
  }, [id]);

  useEffect(() => {
    if ('idDrink' in drink) {
      setLoading(false);
    }
  }, [drink]);

  return (
    <div className={ styles.recipeDetailsDrink }>
      <h2>Recipe Details</h2>
      {loading && (
        <h4
          style={ { textAlign: 'center', marginTop: '100px' } }
        >
          Loading...
        </h4>
      )}
      {!loading && <RecipeDetails
        name={ drink.strDrink }
        image={ drink.strDrinkThumb }
        category={ drink.strCategory }
        instructions={ drink.strInstructions }
        video="null"
        ingredients={ drink.ingredients }
        isMeal={ false }
        recomendation={ meals }
        id={ drink.idDrink }
        nationality=""
        alcoholicOrNot={ drink.strAlcoholic }
      />}

    </div>
  );
}

RecipeDetailsDrinks.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default RecipeDetailsDrinks;
