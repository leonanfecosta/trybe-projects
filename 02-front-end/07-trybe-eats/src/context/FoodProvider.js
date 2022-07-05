import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FoodContext from './FoodContext';
import {
  getMeals,
  getMealsCategories,
  getMealsByCategory,
  getFoodByIngredient,
} from '../services/mealApi';
import {
  getDrinks,
  getDrinksCategories,
  getDrinksByCategory,
  getDrinkByIngredient,
} from '../services/drinkApi';

function FoodProvider({ children }) {
  const [foods, setFood] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [route, setRoute] = useState('food');
  const [foodsCategories, setFoodCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [ingredient, setIngredient] = useState('');
  const [ingredientDrink, setIngredientDrink] = useState('');

  const fetchMeals = async () => {
    const meals = await getMeals();
    setFood(meals);
  };

  const fetchDrinks = async () => {
    const drinksData = await getDrinks();
    setDrinks(drinksData);
  };

  const fetchDrinksCategories = async () => {
    const drinksCategoriesData = await getDrinksCategories();
    setDrinksCategories(drinksCategoriesData);
  };

  const fetchFoodsCategories = async () => {
    const foodsCategoriesData = await getMealsCategories();
    setFoodCategories(foodsCategoriesData);
  };

  const fetchFoodsByCategory = async (category) => {
    const foodsData = await getMealsByCategory(category);
    setFood(foodsData);
  };

  const fetchDrinksByCategory = async (category) => {
    const drinksData = await getDrinksByCategory(category);
    setDrinks(drinksData);
  };

  const fetchExplore = async (element) => {
    const ingredientsData = await getFoodByIngredient(element);
    setFood(ingredientsData);
  };

  const fetchExploreDrinks = async (elementDrink) => {
    const ingredientsDrinkData = await getDrinkByIngredient(elementDrink);
    setDrinks(ingredientsDrinkData);
  };

  useEffect(() => {
    fetchMeals();
    fetchDrinks();
    fetchFoodsCategories();
    fetchDrinksCategories();
  }, []);

  const contextValue = {
    foods,
    setFood,
    drinks,
    setDrinks,
    route,
    setRoute,
    foodsCategories,
    drinksCategories,
    fetchFoodsByCategory,
    fetchDrinksByCategory,
    fetchDrinks,
    fetchMeals,
    setIngredient,
    ingredient,
    setIngredientDrink,
    ingredientDrink,
    fetchExplore,
    fetchExploreDrinks,
  };

  return (
    <FoodContext.Provider value={ contextValue }>{children}</FoodContext.Provider>
  );
}

FoodProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FoodProvider;
