import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InProgressDetails from '../components/InProgressDetails';
import { getDrinkById } from '../services/drinkApi';
import styles from '../styles/InProgressRecipeDrinks.module.css';

function InProgressRecipeDrinks(props) {
  const [drink, setDrink] = useState({});
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
  }, [id]);

  useEffect(() => {
    if ('idDrink' in drink) {
      setLoading(false);
    }
  }, [drink]);

  return (
    <div className={ styles.inProgressRecipeDrinks }>
      <h3 className={ styles.title }>In Progress Recipe</h3>
      {loading && (
        <h4
          style={ { textAlign: 'center', marginTop: '100px' } }
        >
          Loading...
        </h4>
      )}
      {!loading && <InProgressDetails
        name={ drink.strDrink }
        image={ drink.strDrinkThumb }
        category={ drink.strCategory }
        instructions={ drink.strInstructions }
        ingredients={ drink.ingredients }
        id={ id }
        isMeal={ false }
        nationality=""
        alcoholicOrNot={ drink.strAlcoholic }
        type="drink"
        area={ drink.strArea }
        tags={ [] }
      />}
    </div>
  );
}

InProgressRecipeDrinks.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default InProgressRecipeDrinks;
