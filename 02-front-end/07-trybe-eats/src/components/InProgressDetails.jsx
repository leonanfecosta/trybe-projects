import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import CheckBox from './CheckBox';
import localStorageValid from '../services/helpers/localStorageValid';
import setFavoriteLocalStorage from '../services/helpers/setFavoriteLocalStorage';
import styles from '../styles/InProgressDetails.module.css';

function InProgressDetails({
  name,
  image,
  category,
  instructions,
  ingredients,
  id,
  isMeal,
  nationality,
  alcoholicOrNot,
  type,
  tags,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [wasCopied, setWasCopied] = useState(false);
  const [doneIngredients, setDoneIngredients] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const favoriteRecipeStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setIsFavorite(favoriteRecipeStorage?.some((recipe) => recipe.id === id));
  }, [id]);

  useEffect(() => {
    if (doneIngredients && doneIngredients.length === ingredients.length) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [doneIngredients, setBtnDisabled, ingredients]);

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

  const doneRecipes = () => {
    const previousRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const doneDate = `${day}/${month}/${year}`;
    const recipe = {
      id,
      type,
      name,
      image,
      category,
      nationality,
      tags,
      alcoholicOrNot,
      doneDate,
    };
    localStorage.setItem('doneRecipes', JSON
      .stringify([...previousRecipes, recipe]));

    history.push('/done-recipes');
  };

  return (
    <div className={ styles.inProgressDetails }>
      <div className={ styles.recipeImageDiv }>
        <img
          data-testid="recipe-photo"
          src={ image }
          alt={ name }
        />
      </div>
      <h3 data-testid="recipe-title">{ name }</h3>
      <p data-testid="recipe-category">{ category }</p>

      <div className={ styles.buttonSection }>
        <input
          type="image"
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="shareIcon"
          onClick={ handleFavorite }
        />

        <input
          type="image"
          src={ shareIcon }
          alt="shareIcon"
          data-testid="share-btn"
          onClick={ () => {
            const arrayHistory = history.location.pathname.split('/');
            copy(`http://localhost:3000/${arrayHistory[1]}/${arrayHistory[2]}`);
            setWasCopied(true);
          } }
        />
      </div>
      {wasCopied && <p>Link copied!</p>}

      <h4>Ingredients</h4>
      <form className="form-group form-check">
        {ingredients?.map((ingredient, index) => (
          <CheckBox
            key={ index }
            name={ ingredient }
            index={ index }
            type={ isMeal === true ? 'meals' : 'cocktails' }
            id={ id }
            doneIngredients={ doneIngredients === undefined ? [] : doneIngredients }
            setDoneIngredients={ setDoneIngredients }
          />

        ))}
      </form>
      <article data-testid="instructions">{ instructions }</article>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ doneRecipes }
        disabled={ btnDisabled }
        className={ styles.buttonFinishRecipe }
      >
        Finish Recipe
      </button>
    </div>
  );
}

InProgressDetails.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  isMeal: PropTypes.bool.isRequired,
  nationality: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default InProgressDetails;
