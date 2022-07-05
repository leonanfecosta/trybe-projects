import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import InputRadio from './InputRadio';
import {
  getFoodByIngredient,
  getFoodByName,
  getFoodByFirstLetter,
} from '../services/mealApi';
import {
  getDrinkByIngredient,
  getDrinkByName,
  getDrinkByFirstLetter,
} from '../services/drinkApi';
import FoodContext from '../context/FoodContext';
import styles from '../styles/SearchBar.module.css';

// Aplicação utilizando node, criado pelo Especialista Gabriel Espindola
// para resolver o problema do teste com o global.alert
if (process.env?.NODE_ENV === 'test') {
  global.alert = (something) => { global.lastAlert = something; };
}

function SearchBar() {
  const history = useHistory();
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState('name');
  const { setFood, setDrinks, route } = useContext(FoodContext);

  const verifyFood = (food) => {
    if (food && food.length === 1) {
      history.push(`/foods/${food[0].idMeal}`);
    }
  };

  const verifyDrink = (drink) => {
    if (drink && drink.length === 1) {
      history.push(`/drinks/${drink[0].idDrink}`);
    }
  };

  const verifySearch = (search) => {
    if (!search) {
      global.alert(
        'Sorry, we haven\'t found any recipes for these filters.',
      );
    }
  };

  const handleSetFood = async (event) => {
    event.preventDefault();
    switch (searchType) {
    case 'ingredientSearch':
      if (route === 'food') {
        const food = await getFoodByIngredient(searchInput);
        verifySearch(food);
        verifyFood(food);
        return setFood(food);
      }
      if (route === 'drink') {
        const drink = await getDrinkByIngredient(searchInput);
        verifySearch(drink);
        verifyDrink(drink);
        return setDrinks(drink);
      }
      break;
    case 'nameSearch':
      if (route === 'food') {
        const food = await getFoodByName(searchInput);
        verifySearch(food);
        verifyFood(food);
        return setFood(food);
      }
      if (route === 'drink') {
        const drink = await getDrinkByName(searchInput);
        verifySearch(drink);
        verifyDrink(drink);
        return setDrinks(drink);
      }
      break;
    case 'firstLetterSearch':
      if (searchInput.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      if (route === 'food') {
        const food = await getFoodByFirstLetter(searchInput);
        verifySearch(food);
        verifyFood(food);
        return setFood(food);
      }
      if (route === 'drink') {
        const drink = await getDrinkByFirstLetter(searchInput);
        verifySearch(drink);
        verifyDrink(drink);
        return setDrinks(drink);
      }
      break;
    default:
      return true;
    }
  };

  return (
    <form className={ `${styles.searchBar} form-group` }>
      <input
        type="text"
        placeholder="Search Recipes"
        data-testid="search-input"
        name="search-input"
        value={ searchInput }
        onChange={ ({ target }) => setSearchInput(target.value) }
        className="form-control"
      />

      <aside>
        <div className="form-check">

          <InputRadio
            dataTestid="ingredient-search-radio"
            id="ingredient-search-radio"
            name="search-radio"
            value="ingredientSearch"
            labelContent="Ingredient"
            onClick={ ({ target }) => setSearchType(target.value) }
          />

          <InputRadio
            dataTestid="name-search-radio"
            id="name-search-radio"
            name="search-radio"
            value="nameSearch"
            labelContent="Name"
            onClick={ ({ target }) => setSearchType(target.value) }
          />

          <InputRadio
            dataTestid="first-letter-search-radio"
            id="first-letter-search-radio"
            name="search-radio"
            value="firstLetterSearch"
            labelContent="First Letter"
            onClick={ ({ target }) => setSearchType(target.value) }
          />
        </div>
        <button
          type="submit"
          data-testid="exec-search-btn"
          onClick={ handleSetFood }
          className={ styles.buttonFilter }
        >
          Search
        </button>
      </aside>
    </form>
  );
}

export default SearchBar;
