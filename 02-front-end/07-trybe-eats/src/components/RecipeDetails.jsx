import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecomendationsCard from './RecomendationsCard';
import styles from '../styles/RecipeDetails.module.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import localStorageValid from '../services/helpers/localStorageValid';
import localStorageValidObject from '../services/helpers/localStorageValidObject';
import setFavoriteLocalStorage from '../services/helpers/setFavoriteLocalStorage';

function RecipeDetails({
  name,
  image,
  category,
  ingredients,
  instructions,
  video,
  isMeal,
  recomendation,
  id,
  nationality,
  alcoholicOrNot,
}) {
  const [isDoneRecipe, setIsDoneRecipe] = useState(false);
  const [inProgressRecipe, setInProgressRecipe] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [wasCopied, setWasCopied] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const inProgressRecipeStorage = localStorageValidObject('inProgressRecipes');
    setInProgressRecipe(`${id}` in {
      ...inProgressRecipeStorage.cocktails,
      ...inProgressRecipeStorage.meals,
    });

    const doneRecipeStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    const favoriteRecipeStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setIsDoneRecipe(doneRecipeStorage?.some((recipe) => recipe.id === id));
    setIsFavorite(favoriteRecipeStorage?.some((recipe) => recipe.id === id));
  }, [id]);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    const storage = localStorageValid('favoriteRecipes');
    const favorite = {
      id,
      type: isMeal === true ? 'food' : 'drink',
      nationality,
      category,
      alcoholicOrNot,
      name,
      image,
    };
    setFavoriteLocalStorage(isFavorite, favorite, storage, id);
  };

  const pushToInProgress = () => {
    if (isMeal) {
      history.push(`/foods/${id}/in-progress`);
    } else {
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  return (
    <div className={ styles.recipeDetails }>
      <div className={ styles.recipeImageDiv }>
        <img
          data-testid="recipe-photo"
          src={ image }
          alt={ name }
        />
      </div>
      <h3 data-testid="recipe-title">{ name }</h3>
      <p data-testid="recipe-category">{ isMeal ? category : alcoholicOrNot }</p>

      <div className={ styles.buttonSection }>
        <input
          type="image"
          data-testid="favorite-btn"
          onClick={ handleFavorite }
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="shareIcon"
        />

        <input
          type="image"
          data-testid="share-btn"
          onClick={ () => {
            copy(`http://localhost:3000${history.location.pathname}`);
            setWasCopied(true);
          } }
          src={ shareIcon }
          alt="shareIcon"
        />
      </div>
      {wasCopied && <p>Link copied!</p>}

      <h4>Ingredients</h4>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {ingredient}
          </li>
        ))}
      </ul>
      <article data-testid="instructions">{ instructions }</article>

      {/* Resolução proveniente da thread da turma 20 tribo A -
      https://trybecourse.slack.com/archives/C02T5FNGN07/p1655841646592859 */}
      <div className={ styles.iframeContainer }>
        {isMeal && <iframe
          width="420"
          height="315"
          src={ `https://www.youtube.com/embed/${video.split('=')[1]}` }
          title={ name }
          data-testid="video"
        />}
      </div>
      <aside>
        {recomendation.map((recipe, index) => {
          let keyRecipe = 'strMeal';
          if (isMeal) {
            keyRecipe = 'strDrink';
          }
          return (<RecomendationsCard
            key={ index }
            index={ index }
            food={ recipe }
            srcImg={ recipe[`${keyRecipe}Thumb`] }
            alt={ recipe[keyRecipe] }
            name={ recipe[keyRecipe] }
          />);
        })}
      </aside>
      {(!isDoneRecipe && inProgressRecipe) && (
        <button
          data-testid="start-recipe-btn"
          type="button"
          className={ styles.buttonContinueRecipe }
          onClick={ pushToInProgress }
        >
          Continue Recipe
        </button>
      )}
      {(!isDoneRecipe && !inProgressRecipe) && (
        <button
          data-testid="start-recipe-btn"
          type="button"
          className={ styles.buttonStartRecipe }
          onClick={ pushToInProgress }
        >
          Start Recipe
        </button>
      )}
    </div>
  );
}

RecipeDetails.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  isMeal: PropTypes.bool.isRequired,
  recomendation: PropTypes.arrayOf(PropTypes.shape(PropTypes.string)).isRequired,
  id: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
};

export default RecipeDetails;
