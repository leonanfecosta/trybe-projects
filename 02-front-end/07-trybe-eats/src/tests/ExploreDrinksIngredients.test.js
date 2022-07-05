import React from 'react';
import { screen, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import URLS from './mocks/urls';
import drinkIngredient from './mocks/drinkIngredient';
import drinksIngredientsExplore from './mocks/drinksIngredientsExplore';

const NUMBER_OF_MEALS = 12;
const EXPLORE_DRINKS_INGREDIENTS = '/explore/drinks/ingredients';
const FIRST_INGREDIENTE = '0-ingredient-card';
const INGREDIENTS_ARRAY = drinkIngredient.drinks.slice(0, NUMBER_OF_MEALS)
  .map((({ strIngredient1 }) => strIngredient1));

const RECIPES_FROM_INGREDIENTE = drinksIngredientsExplore.drinks.slice(0, NUMBER_OF_MEALS)
  .map((({ strDrink }) => strDrink));

expect.extend({
  validURL: (received, validator) => {
    if (validator[received]) return { message: () => 'URL mockada', pass: true };
    return { message: () => 'URL não mockada', pass: false };
  },
});

describe('teste do ExploreDrinksIngredients', () => {
  it('avalia a renderização dos elementos da página', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch').mockImplementation(async (URL) => (
        { json: async () => URLS[URL] || expect(URL).validURL(URLS) }
      ));
    const { history } = renderWithRouter(<App />);
    expect(fetchMock).toBeCalled();
    history.push(EXPLORE_DRINKS_INGREDIENTS);

    await waitForElement(() => screen
      .getByText(drinkIngredient.drinks[0].strIngredient1));

    INGREDIENTS_ARRAY.forEach((dataTest) => {
      expect(screen.getByText(dataTest)).toBeInTheDocument();
    });
  });

  it('avalia mudança de rota ao clicar em um ingrediente', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch').mockImplementation(async (URL) => (
        { json: async () => URLS[URL] || expect(URL).validURL(URLS) }
      ));
    const { history } = renderWithRouter(<App />);
    expect(fetchMock).toBeCalled();
    history.push(EXPLORE_DRINKS_INGREDIENTS);

    await waitForElement(() => screen
      .getByText(drinkIngredient.drinks[0].strIngredient1));

    userEvent.click(screen.getByTestId(FIRST_INGREDIENTE));

    await waitForElement(() => screen
      .getByText(RECIPES_FROM_INGREDIENTE[0]));

    RECIPES_FROM_INGREDIENTE.forEach((dataTest) => {
      expect(screen.getByText(dataTest)).toBeInTheDocument();
    });
  });
});
