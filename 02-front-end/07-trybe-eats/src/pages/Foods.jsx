import React, { useContext, useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodContext from '../context/FoodContext';
import CardFood from '../components/cardFood';
import Buttons from '../components/Buttons';
import styles from '../styles/Foods.module.css';

function Foods() {
  const [filter, setFilter] = useState('All');
  const [previousCategory, setPreviousCategory] = useState('');
  const { foods,
    foodsCategories,
    fetchFoodsByCategory,
    fetchMeals,
    ingredient,
    fetchExplore } = useContext(FoodContext);
  const NUMBER_OF_FOODS = 12;
  const NUMBER_OF_CATEGORIES = 5;

  useEffect(() => {
    const handleCategory = () => {
      if (filter !== 'All') {
        fetchFoodsByCategory(filter);
      }
      if ((filter === 'All' || filter === previousCategory) && ingredient === '') {
        fetchMeals();
      }
      if (ingredient !== '') {
        fetchExplore(ingredient);
      }
    };
    handleCategory();
  }, [filter]);

  const handleFilter = (name) => {
    if (name !== filter) {
      setFilter(name);
    }
    if (name === filter) {
      setPreviousCategory(name);
      setFilter('All');
    }
  };

  return (
    <div className={ styles.foods }>
      <Header title="Foods" showButton route="food" />
      <nav>
        <Buttons
          name="All"
          dataTestid="All-category-filter"
          onClick={ fetchMeals }
          className={ styles.allButton }
        />
        {
          foodsCategories && foodsCategories
            .slice(0, NUMBER_OF_CATEGORIES).map((categories) => (
              <Buttons
                key={ categories.strCategory }
                name={ categories.strCategory }
                dataTestid={ `${categories.strCategory}-category-filter` }
                onClick={ ({ target }) => handleFilter(target.name) }
                className={ styles.button }
              />))
        }
      </nav>
      <main>
        { foods && foods.slice(0, NUMBER_OF_FOODS).map((food, index) => (
          <CardFood
            key={ food.idMeal }
            id={ food.idMeal }
            srcImg={ food.strMealThumb }
            alt={ food.strMeal }
            name={ food.strMeal }
            dataTestIdCard={ `${index}-recipe-card` }
            dataTestIdImg={ `${index}-card-img` }
            dataTestIdName={ `${index}-card-name` }
            route="food"
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default Foods;
