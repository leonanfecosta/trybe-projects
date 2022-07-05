import React from 'react';
import {
  screen,
  waitForElement,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import URLS from './mocks/urls';
import meals from './mocks/meals';
import mealsCategories from './mocks/mealsCategories';
import mealsByCategory from './mocks/mealsByCategory';
import mealsByIngredient from './mocks/mealsByIngredient';
import mealsByName from './mocks/mealsByName';
import mealsByFirstLetter from './mocks/mealsByFirstLetter';
import mealsByFirstLetterRedirect from './mocks/mealsByFirstLetterRedirect';

const FOODS_PATH = '/foods';
const NUMBER_OF_CATEGORIES = 5;
const NUMBER_OF_MEALS = 12;
const BEEF_CATEGORY = 'Beef-category-filter';
const SEARCH_BUTTON = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const FILTER_BUTTON = 'exec-search-btn';
const SEARCH_INGREDIENT = 'ingredient-search-radio';
const SEARCH_NAME = 'name-search-radio';
const SEARCH_BY_FIRST_LETTER = 'first-letter-search-radio';

const DEFAULT_RECIPES_MEALS = meals.meals.map(({ strMeal }) => strMeal);
const RECIPES_MEALS_CATEGORY = mealsCategories.meals.slice(0, NUMBER_OF_CATEGORIES)
  .map(({ strCategory }) => strCategory);
const RECIPES_BEEFS_MEALS = mealsByCategory.meals.slice(0, NUMBER_OF_MEALS)
  .map(({ strMeal }) => strMeal);
const RECIPES_MEALS_INGREDIENT = mealsByIngredient.meals.slice(0, NUMBER_OF_MEALS)
  .map((({ strMeal }) => strMeal));
const RECIPES_MEALS_NAME = mealsByName.meals.slice(0, NUMBER_OF_MEALS)
  .map((({ strMeal }) => strMeal));
const RECIPES_MEALS_FIRST_LETTER = mealsByFirstLetter.meals.slice(0, NUMBER_OF_MEALS)
  .map((({ strMeal }) => strMeal));

expect.extend({
  validURL: (received, validator) => {
    if (validator[received]) return { message: () => 'URL mockada', pass: true };
    return { message: () => 'URL não mockada', pass: false };
  },
});

describe('teste da tela de Foods', () => {
  it('deve renderizar a tela de Foods com os componentes certos', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch').mockImplementation(async (URL) => (
        { json: async () => URLS[URL] || expect(URL).validURL(URLS) }
      ));
    const { history } = renderWithRouter(<App />);
    expect(fetchMock).toBeCalled();
    history.push(FOODS_PATH);

    await waitForElement(() => screen.getByText(DEFAULT_RECIPES_MEALS[0]));

    DEFAULT_RECIPES_MEALS.forEach((recipe) => {
      expect(screen.getByText(recipe)).toBeInTheDocument();
    });
  });

  it('deve renderizar os botões das 5 primeiras categorias', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch').mockImplementation(async (URL) => (
        { json: async () => URLS[URL] || expect(URL).validURL(URLS) }
      ));
    const { history } = renderWithRouter(<App />);
    expect(fetchMock).toBeCalled();
    history.push(FOODS_PATH);

    await waitForElement(() => screen.getByText(DEFAULT_RECIPES_MEALS[0]));

    RECIPES_MEALS_CATEGORY.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });

    userEvent.click(screen.getByTestId(BEEF_CATEGORY));
    await waitForElementToBeRemoved(() => screen.getByText(DEFAULT_RECIPES_MEALS[0]));
    RECIPES_BEEFS_MEALS.forEach((recipe) => {
      expect(screen.getByText(recipe)).toBeInTheDocument();
    });

    userEvent.click(screen.getByTestId(BEEF_CATEGORY));
    await waitForElementToBeRemoved(() => screen.getByText(RECIPES_BEEFS_MEALS[0]));
    await waitForElement(async () => expect(await screen
      .findByText(DEFAULT_RECIPES_MEALS[0])).toBeInTheDocument());
  });
});

describe('teste do Componente Search Bar', () => {
  it('renderiza receitadas pela busca de ingredientes', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async (URL) => (
      { json: async () => URLS[URL] || expect(URL).validURL(URLS) }
    ));
    const { history } = renderWithRouter(<App />);

    history.push(FOODS_PATH);
    await waitForElement(() => screen.getByText(DEFAULT_RECIPES_MEALS[0]));

    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'chicken');
    userEvent.click(screen.getByTestId(SEARCH_INGREDIENT));
    userEvent.click(screen.getByTestId(FILTER_BUTTON));
    await waitForElementToBeRemoved(() => screen.getByText(DEFAULT_RECIPES_MEALS[0]));
    await waitForElement(async () => expect(await screen
      .findByText(RECIPES_MEALS_INGREDIENT[0])).toBeInTheDocument());
  });

  it('renderiza receitadas pela busca de nome', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async (URL) => (
      { json: async () => URLS[URL] || expect(URL).validURL(URLS) }
    ));
    const { history } = renderWithRouter(<App />);

    history.push(FOODS_PATH);
    await waitForElement(() => screen.getByText(DEFAULT_RECIPES_MEALS[0]));

    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'chocolate');
    userEvent.click(screen.getByTestId(SEARCH_NAME));
    userEvent.click(screen.getByTestId(FILTER_BUTTON));
    await waitForElementToBeRemoved(() => screen.getByText(DEFAULT_RECIPES_MEALS[0]));
    await waitForElement(async () => expect(await screen
      .findByText(RECIPES_MEALS_NAME[0])).toBeInTheDocument());
  });

  it('renderiza receitadas pela busca pela primeira letra', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async (URL) => (
      { json: async () => URLS[URL] || expect(URL).validURL(URLS) }
    ));
    const { history } = renderWithRouter(<App />);

    history.push(FOODS_PATH);
    await waitForElement(() => screen.getByText(DEFAULT_RECIPES_MEALS[0]));

    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'w');
    userEvent.click(screen.getByTestId(SEARCH_BY_FIRST_LETTER));
    userEvent.click(screen.getByTestId(FILTER_BUTTON));
    await waitForElementToBeRemoved(() => screen.getByText(DEFAULT_RECIPES_MEALS[0]));
    await waitForElement(async () => expect(await screen
      .findByText(RECIPES_MEALS_FIRST_LETTER[0])).toBeInTheDocument());
  });

  it('redireciona para a pagina de detalhes se a API retornar item único', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async (URL) => (
      { json: async () => URLS[URL] || expect(URL).validURL(URLS) }
    ));
    const { history } = renderWithRouter(<App />);

    history.push(FOODS_PATH);
    await waitForElement(() => screen.getByText(DEFAULT_RECIPES_MEALS[0]));

    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'y');
    userEvent.click(screen.getByTestId(SEARCH_BY_FIRST_LETTER));
    userEvent.click(screen.getByTestId(FILTER_BUTTON));
    await waitForElementToBeRemoved(() => screen.getByText(DEFAULT_RECIPES_MEALS[0]));
    await waitForElement(async () => expect(await screen
      .findByText(mealsByFirstLetterRedirect.meals[0].strMeal)).toBeInTheDocument());
    expect(history.location.pathname)
      .toBe(`/foods/${mealsByFirstLetterRedirect.meals[0].idMeal}`);
  });

  it('avaliar se o alerta é criado', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async (URL) => (
      { json: async () => URLS[URL] || expect(URL).validURL(URLS) }
    ));
    const alertMock = jest.spyOn(global, 'alert');
    const TIME_TO_WAIT = 1000;
    const { history } = renderWithRouter(<App />);
    history.push(FOODS_PATH);
    await waitForElement(() => screen.getByText('Corba'));

    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'pedra');
    userEvent.click(screen.getByTestId(SEARCH_NAME));
    userEvent.click(screen.getByTestId(FILTER_BUTTON));
    setTimeout(() => {
      expect(alertMock).toHaveBeenCalled();
    }, TIME_TO_WAIT);
  });
});
