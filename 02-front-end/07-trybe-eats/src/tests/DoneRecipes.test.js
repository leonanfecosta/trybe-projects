import React from 'react';
import {
  screen,
  waitForElement,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const DONE_RECIPE_PATH = '/done-recipes';
const NUMBER_OF_TAGS = 5;

const BUTTON_FILTER_ALL = 'filter-by-all-btn';
const BUTTON_FILTER_FOOD = 'filter-by-food-btn';
const BUTTON_FILTER_DRINK = 'filter-by-drink-btn';

const ARRAY_FILTERS_BUTTONS = [
  BUTTON_FILTER_ALL,
  BUTTON_FILTER_FOOD,
  BUTTON_FILTER_DRINK,
];

const DATA_TEST_FOOD_CARD = [
  '0-horizontal-image',
  '0-horizontal-top-text',
  '0-horizontal-name',
  '0-horizontal-done-date',
  '0-horizontal-share-btn',
  '0-Pasta-horizontal-tag',
  '0-Curry-horizontal-tag',
];

const DATA_TEST_DRINK_CARD = [
  '1-horizontal-image',
  '1-horizontal-top-text',
  '1-horizontal-name',
  '1-horizontal-share-btn',
  '1-horizontal-done-date',
];

const DATA_TEST_DRINK_CARD_FILTERED = [
  '0-horizontal-image',
  '0-horizontal-top-text',
  '0-horizontal-name',
  '0-horizontal-share-btn',
  '0-horizontal-done-date',
];

const doneRecipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

describe('teste do DoneRecipes', () => {
  it('avalia a renderização dos elementos a partir do App', () => {
    const { history } = renderWithRouter(<App />);
    history.push(DONE_RECIPE_PATH);
    expect(screen.getByText(/Done Recipes/i)).toBeInTheDocument();
    ARRAY_FILTERS_BUTTONS.forEach((dataTest) => {
      expect(screen.getByTestId(dataTest)).toBeInTheDocument();
    });
  });

  it('avalia a renderização das receitas feitas', async () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    history.push(DONE_RECIPE_PATH);

    await waitForElement(() => screen.findByTestId(DATA_TEST_FOOD_CARD[2]));
    await waitForElement(() => screen.findByTestId(DATA_TEST_DRINK_CARD[2]));

    [...DATA_TEST_FOOD_CARD, ...DATA_TEST_DRINK_CARD].forEach((dataTest) => {
      expect(screen.getByTestId(dataTest)).toBeInTheDocument();
    });
  });

  it('avalia a renderização das receitas feitas com filtro por comida', async () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    history.push(DONE_RECIPE_PATH);

    await waitForElement(() => screen.findByTestId(DATA_TEST_FOOD_CARD[2]));
    await waitForElement(() => screen.findByTestId(DATA_TEST_DRINK_CARD[2]));

    userEvent.click(screen.getByTestId(BUTTON_FILTER_FOOD));
    DATA_TEST_FOOD_CARD.forEach((dataTest) => {
      expect(screen.getByTestId(dataTest)).toBeInTheDocument();
    });
    DATA_TEST_DRINK_CARD.forEach((dataTest) => {
      expect(screen.queryByTestId(dataTest)).not.toBeInTheDocument();
    });
  });

  it('avalia a renderização das receitas feitas com filtro por bebida', async () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    history.push(DONE_RECIPE_PATH);

    await waitForElement(() => screen.findByTestId(DATA_TEST_FOOD_CARD[2]));
    await waitForElement(() => screen.findByTestId(DATA_TEST_DRINK_CARD[2]));

    userEvent.click(screen.getByTestId(BUTTON_FILTER_DRINK));
    DATA_TEST_DRINK_CARD_FILTERED.forEach((dataTest) => {
      expect(screen.getByTestId(dataTest)).toBeInTheDocument();
    });

    DATA_TEST_FOOD_CARD.slice(NUMBER_OF_TAGS).forEach((dataTest) => {
      expect(screen.queryByTestId(dataTest)).not.toBeInTheDocument();
    });
  });

  it('avalia a renderização das receitas feitas com filtro por todas', async () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    history.push(DONE_RECIPE_PATH);

    await waitForElement(() => screen.findByTestId(DATA_TEST_FOOD_CARD[2]));
    await waitForElement(() => screen.findByTestId(DATA_TEST_DRINK_CARD[2]));

    userEvent.click(screen.getByTestId(BUTTON_FILTER_ALL));
    [...DATA_TEST_FOOD_CARD, ...DATA_TEST_DRINK_CARD].forEach((dataTest) => {
      expect(screen.getByTestId(dataTest)).toBeInTheDocument();
    });
  });

  //  TODO: teste do botão de compartilhar
});
