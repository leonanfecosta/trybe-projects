import React, { useEffect, useState } from 'react';
import Buttons from '../components/Buttons';
import Header from '../components/Header';
import styles from '../styles/DoneRecipes.module.css';
import DoneRecipesDetails from '../components/DoneRecipesDetails';

function DoneRecipes() {
  const [completedRecipes, setCompletedRecipes] = useState([]);

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setCompletedRecipes(recipes);
  }, []);

  const handleAllFilter = () => {
    setCompletedRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
  };

  const handleFoodFilter = () => {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const filteredRecipes = recipes.filter((recipe) => recipe.type === 'food');
    setCompletedRecipes(filteredRecipes);
  };

  const handleDrinkFilter = () => {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const filteredRecipes = recipes.filter((recipe) => recipe.type === 'drink');
    setCompletedRecipes(filteredRecipes);
  };

  return (
    <div className={ styles.doneRecipes }>
      <Header title="Done Recipes" showButton={ false } route="null" />
      <nav>
        <Buttons
          dataTestid="filter-by-all-btn"
          name="All"
          onClick={ handleAllFilter }
          className={ styles.allButton }
        />
        <Buttons
          dataTestid="filter-by-food-btn"
          name="Food"
          onClick={ handleFoodFilter }
          className={ styles.button }
        />
        <Buttons
          dataTestid="filter-by-drink-btn"
          name="Drink"
          onClick={ handleDrinkFilter }
          className={ styles.button }
        />
      </nav>
      <section>
        {(completedRecipes || []).map((recipe, index) => (
          <DoneRecipesDetails
            key={ recipe.id }
            id={ recipe.id }
            type={ recipe.type }
            name={ recipe.name }
            index={ index }
            image={ recipe.image }
            tags={ recipe.tags }
            nationality={ recipe.nationality }
            category={ recipe.category }
            alcoholicOrNot={ recipe.alcoholicOrNot }
            doneDate={ recipe.doneDate }
          />
        ))}
      </section>
    </div>
  );
}

export default DoneRecipes;
