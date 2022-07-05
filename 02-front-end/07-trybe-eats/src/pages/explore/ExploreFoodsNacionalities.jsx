import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../../styles/ExploreFoodsNacionalities.module.css';
import getNacionalities from '../../services/nacionalities';
import getMealsByArea from '../../services/getMealsByArea';
import CardFood from '../../components/cardFood';
import { getMeals } from '../../services/mealApi';

function ExploreFoodsNacionalities() {
  const [nationalities, setNationalities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [select, setSelect] = useState('All');
  const [mealsArea, setMealsArea] = useState([]);
  const NUMBER = 12;

  const updateMeals = async () => {
    setMealsArea(await getMeals());
  };

  useEffect(() => {
    getNacionalities().then((item) => setNationalities(item));
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [nationalities, mealsArea]);

  useEffect(() => {
    if (select === 'All') {
      updateMeals();
    } else {
      getMealsByArea(select).then((item) => setMealsArea(item));
    }
  }, [select]);

  return (
    <div className={ styles.exploreFoodsNacionalities }>
      <Header title="Explore Nationalities" showButton route="null" />
      <Footer />
      {loading && (
        <h4
          style={ { textAlign: 'center', marginTop: '100px' } }
        >
          Loading...
        </h4>
      )}
      <div className={ `${styles.select} form-group` }>
        {
          !loading && (
            <select
              data-testid="explore-by-nationality-dropdown"
              onChange={ (event) => setSelect(event.target.value) }
              className="form-control"
            >
              <option
                name="nacionality"
                data-testid="All-option"
              >
                All
              </option>
              {nationalities.map((nacionality) => (
                <option
                  name="nacionality"
                  key={ nacionality.strArea }
                  data-testid={ `${nacionality.strArea}-option` }
                >
                  {nacionality.strArea}

                </option>
              ))}
            </select>
          )
        }
      </div>
      <main className={ styles.cardContainer }>
        {(!loading && mealsArea) && mealsArea.slice(0, NUMBER).map((food, index) => (
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
    </div>
  );
}

export default ExploreFoodsNacionalities;
