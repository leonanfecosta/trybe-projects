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
import drinks from './mocks/drinks';
import drinksCategories from './mocks/drinksCategories';
import drinksByCategory from './mocks/drinksByCategory';
import drinksByIngredient from './mocks/drinksByIngredient';
import drinksByName from './mocks/drinksByName';
import drinksByFirstLetter from './mocks/drinksByFirstLetter';
import drinksByFirstLetterRedirect from './mocks/drinksByFirstLetterRedirect';

const DRINKS_PATH = '/drinks';
const NUMBER_OF_CATEGORIES = 5;
const NUMBER_OF_DRINKS = 12;
const COCKTAIL_CATEGORY = 'Cocktail-category-filter';
const SEARCH_BUTTON = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const FILTER_BUTTON = 'exec-search-btn';
const SEARCH_INGREDIENT = 'ingredient-search-radio';
const SEARCH_NAME = 'name-search-radio';
const SEARCH_BY_FIRST_LETTER = 'first-letter-search-radio';

const DEFAULT_RECIPES_DRINKS = drinks.drinks.map(({ strDrink }) => strDrink);
const RECIPES_DRINKS_CATEGORY = drinksCategories.drinks.slice(0, NUMBER_OF_CATEGORIES)
  .map((({ strCategory }) => strCategory));
const RECIPES_ORDINARY_DRINKS = drinksByCategory.drinks.slice(0, NUMBER_OF_DRINKS)
  .map((({ strDrink }) => strDrink));
const RECIPES_DRINKS_INGREDIENT = drinksByIngredient.drinks.slice(0, NUMBER_OF_DRINKS)
  .map((({ strDrink }) => strDrink));
const RECIPES_DRINKS_NAME = drinksByName.drinks.slice(0, NUMBER_OF_DRINKS)
  .map((({ strDrink }) => strDrink));
const RECIPES_DRINKS_BY_FIRST_LETTER = drinksByFirstLetter.drinks
  .slice(0, NUMBER_OF_DRINKS)
  .map((({ strDrink }) => strDrink));

expect.extend({
  validURL: (received, validator) => {
    if (validator[received]) return { message: () => 'URL mockada', pass: true };
    return { message: () => 'URL não mockada', pass: false };
  },
});

describe('teste da tela de Drinks', () => {
  it('deve renderizar a tela de Drinks com os componentes certos', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch').mockImplementation(async (URL) => (
        { json: async () => URLS[URL] || expect(URL).validURL(URLS) }
      ));
    const { history } = renderWithRouter(<App />);
    expect(fetchMock).toBeCalled();
    history.push(DRINKS_PATH);

    await waitForElement(() => screen.getByText(DEFAULT_RECIPES_DRINKS[0]));
  });

  it('deve renderizar os botões de filtro corretamente', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch').mockImplementation(async (URL) => (
        { json: async () => URLS[URL] || expect(URL).validURL(URLS) }
      ));
    const { history } = renderWithRouter(<App />);
    expect(fetchMock).toBeCalled();
    history.push(DRINKS_PATH);

    await waitForElement(() => screen.getByText(DEFAULT_RECIPES_DRINKS[0]));

    RECIPES_DRINKS_CATEGORY.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it('o botão de filtro deve filtrar os drinks', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch').mockImplementation(async (URL) => (
        { json: async () => URLS[URL] || expect(URL).validURL(URLS) }
      ));
    const { history } = renderWithRouter(<App />);
    expect(fetchMock).toBeCalled();
    history.push(DRINKS_PATH);

    await waitForElement(() => screen.getByText(DEFAULT_RECIPES_DRINKS[0]));

    expect(screen.getByTestId(COCKTAIL_CATEGORY)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(COCKTAIL_CATEGORY));
    await waitForElementToBeRemoved(() => screen.getByText(DEFAULT_RECIPES_DRINKS[0]));
    RECIPES_ORDINARY_DRINKS.forEach((drink) => {
      expect(screen.getByText(drink)).toBeInTheDocument();
    });

    userEvent.click(screen.getByTestId(COCKTAIL_CATEGORY));
    await waitForElementToBeRemoved(() => screen.getByText(RECIPES_ORDINARY_DRINKS[0]));
    await waitForElement(async () => expect(await screen
      .findByText(DEFAULT_RECIPES_DRINKS[0])).toBeInTheDocument());
  });
});

describe('testa o componente searchBar', () => {
  it('deve renderizar os drinks pela busca por ingredientes', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch').mockImplementation(async (URL) => (
        { json: async () => URLS[URL] || expect(URL).validURL(URLS) }
      ));
    const { history } = renderWithRouter(<App />);
    expect(fetchMock).toBeCalled();
    history.push(DRINKS_PATH);

    await waitForElement(() => screen.getByText(DEFAULT_RECIPES_DRINKS[0]));

    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'rum');
    userEvent.click(screen.getByTestId(SEARCH_INGREDIENT));
    userEvent.click(screen.getByTestId(FILTER_BUTTON));
    await waitForElementToBeRemoved(() => screen.getByText(DEFAULT_RECIPES_DRINKS[0]));
    await waitForElement(async () => expect(await screen
      .findByText(RECIPES_DRINKS_INGREDIENT[0])).toBeInTheDocument());
  });

  it('deve renderizar os drinks pela busca por nome', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch').mockImplementation(async (URL) => (
        { json: async () => URLS[URL] || expect(URL).validURL(URLS) }
      ));
    const { history } = renderWithRouter(<App />);
    expect(fetchMock).toBeCalled();
    history.push(DRINKS_PATH);

    await waitForElement(() => screen.getByText(DEFAULT_RECIPES_DRINKS[0]));

    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'Adam');
    userEvent.click(screen.getByTestId(SEARCH_NAME));
    userEvent.click(screen.getByTestId(FILTER_BUTTON));
    await waitForElementToBeRemoved(() => screen.getByText(DEFAULT_RECIPES_DRINKS[0]));
    await waitForElement(async () => expect(await screen
      .findByText(RECIPES_DRINKS_NAME[0])).toBeInTheDocument());
  });

  it('deve renderizar os drinks pela busca da primeira letra', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch').mockImplementation(async (URL) => (
        { json: async () => URLS[URL] || expect(URL).validURL(URLS) }
      ));
    const { history } = renderWithRouter(<App />);
    expect(fetchMock).toBeCalled();
    history.push(DRINKS_PATH);

    await waitForElement(() => screen.getByText(DEFAULT_RECIPES_DRINKS[0]));

    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'q');
    userEvent.click(screen.getByTestId(SEARCH_BY_FIRST_LETTER));
    userEvent.click(screen.getByTestId(FILTER_BUTTON));
    await waitForElement(() => screen.getByText(DEFAULT_RECIPES_DRINKS[0]));
    await waitForElement(async () => expect(await screen
      .findByText(RECIPES_DRINKS_BY_FIRST_LETTER[0])).toBeInTheDocument());
  });

  it('redireciona para a pagina de detalhes se API retornar um drink', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch').mockImplementation(async (URL) => (
        { json: async () => URLS[URL] || expect(URL).validURL(URLS) }
      ));
    const { history } = renderWithRouter(<App />);
    expect(fetchMock).toBeCalled();
    history.push(DRINKS_PATH);

    await waitForElement(() => screen.getByText(DEFAULT_RECIPES_DRINKS[0]));
    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'Aquamarine');
    userEvent.click(screen.getByTestId(SEARCH_NAME));
    userEvent.click(screen.getByTestId(FILTER_BUTTON));
    await waitForElementToBeRemoved(() => screen.getByText(DEFAULT_RECIPES_DRINKS[0]));
    await waitForElement(async () => expect(await screen
      .findByText(drinksByFirstLetterRedirect.drinks[0].strDrink)).toBeInTheDocument());
    expect(history.location.pathname)
      .toBe(`/drinks/${drinksByFirstLetterRedirect.drinks[0].idDrink}`);
  });

  it('avaliar se o alerta é criado', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async (URL) => (
      { json: async () => URLS[URL] || expect(URL).validURL(URLS) }
    ));
    const alertMock = jest.spyOn(global, 'alert');
    const TIME_TO_WAIT = 1000;
    const { history } = renderWithRouter(<App />);
    history.push(DRINKS_PATH);
    await waitForElement(() => screen.getByText('GG'));

    userEvent.click(screen.getByTestId(SEARCH_BUTTON));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'pedra');
    userEvent.click(screen.getByTestId(SEARCH_NAME));
    userEvent.click(screen.getByTestId(FILTER_BUTTON));
    setTimeout(() => {
      expect(alertMock).toHaveBeenCalled();
    }, TIME_TO_WAIT);
  });
});
