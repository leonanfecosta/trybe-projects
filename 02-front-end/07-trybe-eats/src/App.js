import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FoodProvider from './context/FoodProvider';
import UserProvider from './context/UserProvider';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import DoneRecipes from './pages/DoneRecipes';
import ExploreFoods from './pages/explore/ExploreFoods';
import ExploreDrinks from './pages/explore/ExploreDrinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetailsFoods from './pages/RecipeDetailsFoods';
import RecipeDetailsDrinks from './pages/RecipeDetailsDrinks';
import InProgressRecipeFoods from './pages/InProgressRecipeFoods';
import InProgressRecipeDrinks from './pages/InProgressRecipeDrinks';
import ExploreFoodsIngredients from './pages/explore/ExploreFoodsIngredients';
import ExploreDrinksIngredients from './pages/explore/ExploreDrinksIngredients';
import ExploreFoodsNacionalities from './pages/explore/ExploreFoodsNacionalities';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <main>
      <UserProvider>
        <FoodProvider>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/foods" component={ Foods } />
            <Route exact path="/drinks" component={ Drinks } />
            <Route exact path="/drinks/:id" component={ RecipeDetailsDrinks } />
            <Route exact path="/foods/:id" component={ RecipeDetailsFoods } />
            <Route exact path="/explore" component={ Explore } />
            <Route exact path="/explore/foods" component={ ExploreFoods } />
            <Route exact path="/explore/drinks" component={ ExploreDrinks } />
            <Route
              exact
              path="/explore/foods/ingredients"
              component={ ExploreFoodsIngredients }
            />
            <Route
              exact
              path="/explore/drinks/ingredients"
              component={ ExploreDrinksIngredients }
            />
            <Route
              exact
              path="/explore/foods/nationalities"
              component={ ExploreFoodsNacionalities }
            />
            <Route
              exact
              path="/foods/:id/in-progress"
              component={ InProgressRecipeFoods }
            />
            <Route
              exact
              path="/drinks/:id/in-progress"
              component={ InProgressRecipeDrinks }
            />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/done-recipes" component={ DoneRecipes } />
            <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
            <Route exact path="/explore/drinks/nationalities" component={ NotFound } />
          </Switch>
        </FoodProvider>
      </UserProvider>
    </main>
  );
}

export default App;
