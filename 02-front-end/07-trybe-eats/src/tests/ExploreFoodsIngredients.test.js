import React from 'react';
import { screen, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import URLS from './mocks/urls';
import mealsIngredient from './mocks/mealsIngredient';
import mealsByIngredient from './mocks/mealsByIngredient';

const NUMBER_OF_MEALS = 12;
const EXPLORE_FOODS_INGREDIENTS = '/explore/foods/ingredients';
const FIRST_INGREDIENTE = '0-ingredient-card';
const INGREDIENTS_ARRAY = mealsIngredient.meals.slice(0, NUMBER_OF_MEALS)
  .map((({ strIngredient }) => strIngredient));

const RECIPES_FROM_INGREDIENTE = mealsByIngredient.meals.slice(0, NUMBER_OF_MEALS)
  .map((({ strMeal }) => strMeal));

expect.extend({
  validURL: (received, validator) => {
    if (validator[received]) return { message: () => 'URL mockada', pass: true };
    return { message: () => 'URL não mockada', pass: false };
  },
});

describe('teste do ExploreFoodsIngredients', () => {
  it('avalia a renderização dos elementos da página', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch').mockImplementation(async (URL) => (
        { json: async () => URLS[URL] || expect(URL).validURL(URLS) }
      ));
    const { history } = renderWithRouter(<App />);
    expect(fetchMock).toBeCalled();
    history.push(EXPLORE_FOODS_INGREDIENTS);

    await waitForElement(() => screen
      .getByText(INGREDIENTS_ARRAY[0]));

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
    history.push(EXPLORE_FOODS_INGREDIENTS);

    await waitForElement(() => screen
      .getByText(INGREDIENTS_ARRAY[0]));

    userEvent.click(screen.getByTestId(FIRST_INGREDIENTE));

    await waitForElement(() => screen
      .getByText(RECIPES_FROM_INGREDIENTE[0]));

    RECIPES_FROM_INGREDIENTE.forEach((dataTest) => {
      expect(screen.getByText(dataTest)).toBeInTheDocument();
    });
  });
});
