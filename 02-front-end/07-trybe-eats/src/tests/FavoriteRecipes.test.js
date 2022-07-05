import React from 'react';
import {
  screen,
  waitForElement,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

// Implementação do mock para a biblioteca copy proveniente da thread criada
// pelo aluno Guilherme Hermenegildo Junior da Turma 12
// link: https://trybecourse.slack.com/archives/C01T2C18DSM/p1630092847100100
jest.mock('clipboard-copy', () => jest.fn());
const copy = require('clipboard-copy');

const FAVORITE_RECIPE_PATH = '/favorite-recipes';
const BUTTON_FILTER_ALL = 'filter-by-all-btn';
const BUTTON_FILTER_FOOD = 'filter-by-food-btn';
const BUTTON_FILTER_DRINK = 'filter-by-drink-btn';

const ARRAY_FILTERS_BUTTONS = [
  BUTTON_FILTER_ALL,
  BUTTON_FILTER_FOOD,
  BUTTON_FILTER_DRINK,
];

const DATA_TEST_FIRST_CARD = [
  '0-horizontal-image',
  '0-horizontal-top-text',
  '0-horizontal-favorite-btn',
  '0-horizontal-share-btn',
];

const DATA_TEST_SECOND_CARD = [
  '1-horizontal-image',
  '1-horizontal-top-text',
  '1-horizontal-favorite-btn',
  '1-horizontal-share-btn',
];

const favoriteRecipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

describe('teste do FavoriteRecipe', () => {
  it('avalia a renderização dos elementos a partir do App', () => {
    const { history } = renderWithRouter(<App />);
    history.push(FAVORITE_RECIPE_PATH);

    expect(screen.getByText(/Favorite Recipes/i)).toBeInTheDocument();
    ARRAY_FILTERS_BUTTONS.forEach((dataTest) => {
      expect(screen.getByTestId(dataTest)).toBeInTheDocument();
    });
  });

  it('avalia a renderização das receitas favoritadas', async () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    history.push(FAVORITE_RECIPE_PATH);

    await waitForElement(async () => {
      expect(await screen.findByTestId(DATA_TEST_FIRST_CARD[0])).toBeInTheDocument();
    });

    [...DATA_TEST_FIRST_CARD, ...DATA_TEST_SECOND_CARD].forEach((dataTest) => {
      expect(screen.getByTestId(dataTest)).toBeInTheDocument();
    });
  });

  it('avalia o comportamento dos botão de favoritar', async () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    history.push(FAVORITE_RECIPE_PATH);

    await waitForElement(async () => {
      expect(await screen.findByTestId(DATA_TEST_FIRST_CARD[0])).toBeInTheDocument();
    });

    userEvent.click(screen.getByTestId(DATA_TEST_SECOND_CARD[2]));
    DATA_TEST_FIRST_CARD.forEach((dataTest) => {
      expect(screen.getByTestId(dataTest)).toBeInTheDocument();
    });

    await waitForElementToBeRemoved(() => screen.getByTestId(DATA_TEST_SECOND_CARD[0]));
    DATA_TEST_SECOND_CARD.forEach((dataTest) => {
      expect(screen.queryByTestId(dataTest)).not.toBeInTheDocument();
    });
  });

  it('avalia o comportamento dos botão de compartilhar', async () => {
    const { history } = renderWithRouter(<App />);

    // Implementação do mock para a biblioteca copy proveniente da thread criada
    // pelo aluno Guilherme Hermenegildo Junior da Turma 12
    // link: https://trybecourse.slack.com/archives/C01T2C18DSM/p1630092847100100
    copy.mockImplementation(() => null);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    history.push(FAVORITE_RECIPE_PATH);

    await waitForElement(async () => {
      expect(await screen.findByTestId(DATA_TEST_FIRST_CARD[0])).toBeInTheDocument();
    });

    userEvent.click(screen.getByTestId(DATA_TEST_SECOND_CARD[3]));
    expect(copy).toHaveBeenCalled();

    expect(await screen.findByText(/Link copied!/i)).toBeInTheDocument();
  });

  it('avalia o comportamento dos botão de filtrar por comida', async () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    history.push(FAVORITE_RECIPE_PATH);

    await waitForElement(async () => {
      expect(await screen.findByTestId(DATA_TEST_FIRST_CARD[0])).toBeInTheDocument();
    });

    userEvent.click(screen.getByTestId(BUTTON_FILTER_FOOD));
    expect(screen.getByText(favoriteRecipes[0].name)).toBeInTheDocument();
    expect(screen.queryByText(favoriteRecipes[1].name)).not.toBeInTheDocument();
  });

  it('avalia o comportamento dos botão de filtrar por bebida e remoção', async () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    history.push(FAVORITE_RECIPE_PATH);

    await waitForElement(async () => {
      expect(await screen.findByTestId(DATA_TEST_FIRST_CARD[0])).toBeInTheDocument();
    });

    userEvent.click(screen.getByTestId(BUTTON_FILTER_DRINK));
    expect(screen.getByText(favoriteRecipes[1].name)).toBeInTheDocument();
    expect(screen.queryByText(favoriteRecipes[0].name)).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId(BUTTON_FILTER_ALL));
    expect(screen.getByText(favoriteRecipes[0].name)).toBeInTheDocument();
    expect(screen.getByText(favoriteRecipes[1].name)).toBeInTheDocument();
  });
});
