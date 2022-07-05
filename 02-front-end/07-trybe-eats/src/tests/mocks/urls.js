import meals from './meals';
import drinks from './drinks';
import mealsCategories from './mealsCategories';
import drinksCategories from './drinksCategories';
import mealsById from './mealsById';
import drinksById from './drinksById';
import areas from './areas';
import mealsByArea from './mealsByArea';
import mealsByCategory from './mealsByCategory';
import mealsByIngredient from './mealsByIngredient';
import mealsByName from './mealsByName';
import mealsByFirstLetter from './mealsByFirstLetter';
import mealsByFirstLetterRedirect from './mealsByFirstLetterRedirect';
import mealsNotFound from './mealsNotFound';
import drinkIngredient from './drinkIngredient';
import drinksIngredientsExplore from './drinksIngredientsExplore';
import mealsIngredient from './mealsIngredient';
import drinkByCategory from './drinksByCategory';
import drinksByIngredient from './drinksByIngredient';
import drinksByName from './drinksByName';
import drinksByFirstLetter from './drinksByFirstLetter';
import drinksByFirstLetterRedirect from './drinksByFirstLetterRedirect';

const URLS = {
  'https://www.themealdb.com/api/json/v1/1/search.php?s=': meals,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=': drinks,
  'https://www.themealdb.com/api/json/v1/1/list.php?c=list': mealsCategories,
  'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list': drinksCategories,
  'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977': mealsById,
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997': drinksById,
  'https://www.themealdb.com/api/json/v1/1/random.php': mealsById,
  'https://www.thecocktaildb.com/api/json/v1/1/random.php': drinksById,
  'https://www.themealdb.com/api/json/v1/1/list.php?a=list': areas,
  'https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian': mealsByArea,
  'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef': mealsByCategory,
  'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken': mealsByIngredient,
  'https://www.themealdb.com/api/json/v1/1/search.php?s=chocolate': mealsByName,
  'https://www.themealdb.com/api/json/v1/1/search.php?f=w': mealsByFirstLetter,
  'https://www.themealdb.com/api/json/v1/1/search.php?f=y': mealsByFirstLetterRedirect,
  'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52871': mealsByFirstLetterRedirect,
  'https://www.themealdb.com/api/json/v1/1/search.php?s=pedra': mealsNotFound,
  'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list': drinkIngredient,
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum': drinksIngredientsExplore,
  'https://www.themealdb.com/api/json/v1/1/list.php?i=list': mealsIngredient,
  'https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken': mealsByIngredient,
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail': drinkByCategory,
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=rum': drinksByIngredient,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Adam': drinksByName,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=q': drinksByFirstLetter,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine': drinksByFirstLetterRedirect,
};

export default URLS;
