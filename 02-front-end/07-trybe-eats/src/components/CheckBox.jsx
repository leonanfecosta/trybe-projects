import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  addIngredient,
  removeIngredient,
} from '../services/helpers/handleInProgressRecipe';
import verifyChecked from '../services/helpers/verifyIngredientsInProgress';

function CheckBox({ name, index, type, id, doneIngredients, setDoneIngredients }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const inProgressRecipeStorage = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || {};
    if (type === 'meals' && 'meals' in inProgressRecipeStorage) {
      setChecked(
        inProgressRecipeStorage.meals[id]?.find((ingredient) => ingredient === name),
      );
      setDoneIngredients(inProgressRecipeStorage.meals[id]);
    }
    if (type === 'cocktails' && 'cocktails' in inProgressRecipeStorage) {
      setChecked(
        inProgressRecipeStorage.cocktails[id]?.find((ingredient) => ingredient === name),
      );
      setDoneIngredients(inProgressRecipeStorage.cocktails[id]);
    }
  }, [type, name, id, setDoneIngredients]);

  const handleChecked = ({ target }) => {
    setChecked(target.checked);
    const { meals, cocktails } = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || [];
    const setupStorage = { meals: { ...meals }, cocktails: { ...cocktails } };
    if (target.checked) {
      addIngredient(setupStorage, type, name, id);
      setDoneIngredients([...doneIngredients, name]);
    } else {
      removeIngredient(setupStorage, type, name, id);
      setDoneIngredients(doneIngredients.filter((ingredient) => ingredient !== name));
    }
  };

  return (
    <label
      htmlFor={ index }
      data-testid={ `${index}-ingredient-step` }
      style={ checked ? { textDecoration: 'line-through' }
        : { color: 'black' } }
      className="form-check-label"
    >
      <input
        type="checkbox"
        name={ name }
        id={ index }
        onChange={ handleChecked }
        value={ checked }
        checked={ verifyChecked(name, id) }
        className="form-check-input"
      />
      { name }
    </label>
  );
}

CheckBox.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  setDoneIngredients: PropTypes.func.isRequired,
  doneIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CheckBox;
