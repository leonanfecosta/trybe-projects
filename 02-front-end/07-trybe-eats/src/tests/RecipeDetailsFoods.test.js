import React from 'react';
import {
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import mealsById from './mocks/mealsById';
import URLS from './mocks/urls';

// Implementação do mock para a biblioteca copy proveniente da thread criada
// pelo aluno Guilherme Hermenegildo Junior da Turma 12
// link: https://trybecourse.slack.com/archives/C01T2C18DSM/p1630092847100100
jest.mock('clipboard-copy', () => jest.fn());
const copy = require('clipboard-copy');

const MAX_INGREDIENTS = 20;
const RECIPE_FOODS_DETAILS_PATH = '/foods/52977';

const RECIPE_PHOTO = 'recipe-photo';
const RECIPE_TITLE = 'recipe-title';
const RECIPE_CATEGORY = 'recipe-category';
const RECIPE_FAVORITE_BUTTON = 'favorite-btn';
const RECIPE_SHARE_BUTTON = 'share-btn';
const RECIPE_INSTRUCTIONS = 'instructions';
const RECIPE_VIDEO = 'video';
const BUTTON_START_CONTINUE_RECIPE = 'start-recipe-btn';

const RECIPE_INGREDIENTS_NAME_AND_MEASURE = [];
for (let i = 1; i <= MAX_INGREDIENTS; i += 1) {
  const ingredient = `strIngredient${i}`;
  const measure = `strMeasure${i}`;
  if (mealsById.meals[0][ingredient] !== ''
  && mealsById.meals[0][measure] !== ''
  && mealsById.meals[0][ingredient] !== null
  && mealsById.meals[0][measure] !== null
  && mealsById.meals[0][ingredient] !== undefined
  && mealsById.meals[0][measure] !== undefined) {
    RECIPE_INGREDIENTS_NAME_AND_MEASURE.push(`${i - 1}-ingredient-name-and-measure`);
  }
}

const ARRAY_DETAILS_FOODS_DATA_TEST = [
  RECIPE_PHOTO,
  RECIPE_TITLE,
  RECIPE_CATEGORY,
  RECIPE_FAVORITE_BUTTON,
  RECIPE_SHARE_BUTTON,
  ...RECIPE_INGREDIENTS_NAME_AND_MEASURE,
  RECIPE_INSTRUCTIONS,
  RECIPE_VIDEO,
];

// Criação de messagem customizada no Jest criada durante a monitoria com o instrutor
// Especialista Zambelli durante a monitoria, baseado nos links (do Stack OverFlow e Documentação):
// (1) https://stackoverflow.com/questions/45348083/how-to-add-custom-message-to-jest-expect
// e (2) https://jestjs.io/docs/expect#expectextendmatchers
expect.extend({
  validURL: (received, validator) => {
    if (validator[received]) return { message: () => 'URL mockada', pass: true };
    return { message: () => 'URL não mockada', pass: false };
  },
});

describe('teste do RecipeDetailsFoods', () => {
  it('avalia a renderização correta dos elementos da página', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch').mockImplementation(async (URL) => (
        { json: async () => URLS[URL] || expect(URL).validURL(URLS) }
      ));

    const { history } = renderWithRouter(<App />);
    history.push(RECIPE_FOODS_DETAILS_PATH);
    expect(fetchMock).toBeCalled();
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    ARRAY_DETAILS_FOODS_DATA_TEST.forEach((dataTest) => {
      expect(screen.getByTestId(dataTest)).toBeInTheDocument();
    });
  });

  it('avalia o comportamento do botão de favorito', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch').mockImplementation(async (URL) => (
        { json: async () => URLS[URL] || expect(URL).validURL(URLS) }
      ));

    const { history } = renderWithRouter(<App />);
    history.push(RECIPE_FOODS_DETAILS_PATH);
    expect(fetchMock).toBeCalled();
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const buttonFavorite = screen.getByTestId(RECIPE_FAVORITE_BUTTON);
    userEvent.click(buttonFavorite);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toHaveLength(1);
    userEvent.click(buttonFavorite);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toHaveLength(0);
  });

  it('avalia o comportamento dos botão de compartilhar', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch').mockImplementation(async (URL) => (
        { json: async () => URLS[URL] || expect(URL).validURL(URLS) }
      ));

    const { history } = renderWithRouter(<App />);

    // Implementação do mock para a biblioteca copy proveniente da thread criada
    // pelo aluno Guilherme Hermenegildo Junior da Turma 12
    // link: https://trybecourse.slack.com/archives/C01T2C18DSM/p1630092847100100
    copy.mockImplementation(() => null);

    history.push(RECIPE_FOODS_DETAILS_PATH);
    expect(fetchMock).toBeCalled();
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    userEvent.click(screen.getByTestId(RECIPE_SHARE_BUTTON));
    expect(copy).toHaveBeenCalled();

    expect(await screen.findByText(/Link copied!/i)).toBeInTheDocument();
  });

  it('avalia a navegação com o botão de Start Recipe', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch').mockImplementation(async (URL) => (
        { json: async () => URLS[URL] || expect(URL).validURL(URLS) }
      ));

    const { history } = renderWithRouter(<App />);
    history.push(RECIPE_FOODS_DETAILS_PATH);
    expect(fetchMock).toBeCalled();
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const buttonStartRecipe = screen.getByTestId(BUTTON_START_CONTINUE_RECIPE);
    userEvent.click(buttonStartRecipe);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/foods/52977/in-progress');
  });
});
