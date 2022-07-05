import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeDetails from '../components/RecipeDetails';
import { getFoodById } from '../services/mealApi';
import { getDrinks } from '../services/drinkApi';
import styles from '../styles/RecipeDetailsFoods.module.css';

function RecipeDetailsFoods(props) {
  const [meal, setMeal] = useState({});
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { match: { params: { id } } } = props;

  useEffect(() => {
    getFoodById(id)
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
        setMeal(recipe);
      });
    getDrinks().then((response) => {
      const TOTAL_RECOMENDATIONS = 6;
      const responseFilter = response.filter((_, index) => index < TOTAL_RECOMENDATIONS);
      setDrinks(responseFilter);
    });
  }, [id]);

  useEffect(() => {
    if ('idMeal' in meal) {
      setLoading(false);
    }
  }, [meal]);

  return (
    <div className={ styles.recipeDetailsFood }>
      <h2>Recipe Details</h2>
      {loading && (
        <h4
          style={ { textAlign: 'center', marginTop: '100px' } }
        >
          Loading...
        </h4>
      )}
      {!loading && <RecipeDetails
        name={ meal.strMeal }
        image={ meal.strMealThumb }
        category={ meal.strCategory }
        instructions={ meal.strInstructions }
        video={ meal.strYoutube }
        ingredients={ meal.ingredients }
        isMeal
        recomendation={ drinks }
        id={ meal.idMeal }
        nationality={ meal.strArea }
        alcoholicOrNot=""
      />}
    </div>
  );
}

RecipeDetailsFoods.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default RecipeDetailsFoods;
