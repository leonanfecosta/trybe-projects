import React from 'react';
import {
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import URLS from './mocks/urls';
import areas from './mocks/areas';
import meals from './mocks/meals';
import mealsByArea from './mocks/mealsByArea';

const EXPLORE_NACIONALITIES_PATH = '/explore/foods/nationalities';
const SELECT_NACIONALITY_DROPDOWN = 'explore-by-nationality-dropdown';
const OPTIONS_NACIONALITY_DATA_TEST = areas.meals
  .map(({ strArea }) => `${strArea}-option`);
const DEFAULT_RECIPES_MEALS = meals.meals.map(({ strMeal }) => strMeal);
const RECIPES_MEALS_AREA_CANADIAN = mealsByArea.meals.map(({ strMeal }) => strMeal);

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

describe('teste do ExploreFoodsNacionalities', () => {
  it('avalia a renderização correta dos elementos da página', async () => {
    // Criação de um mock genérico com a utilização de Object Literals proveniente
    // da monitoria com o instrutor Especialista Zambelli durante a monitoria
    const fetchMock = jest
      .spyOn(global, 'fetch').mockImplementation(async (URL) => (
        { json: async () => URLS[URL] || expect(URL).validURL(URLS) }
      ));

    const { history } = renderWithRouter(<App />);
    history.push(EXPLORE_NACIONALITIES_PATH);
    expect(fetchMock).toBeCalled();

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    expect(screen.getByTestId(SELECT_NACIONALITY_DROPDOWN)).toBeInTheDocument();

    OPTIONS_NACIONALITY_DATA_TEST.forEach((dataTest) => {
      expect(screen.getByTestId(dataTest)).toBeInTheDocument();
    });
    DEFAULT_RECIPES_MEALS.forEach((mealNames) => {
      expect(screen.getByText(mealNames)).toBeInTheDocument();
    });
  });

  it('avalia a renderização de novos cards ao mudar o select', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch').mockImplementation(async (URL) => (
        { json: async () => URLS[URL] || expect(URL).validURL(URLS) }
      ));

    const { history } = renderWithRouter(<App />);
    history.push(EXPLORE_NACIONALITIES_PATH);
    expect(fetchMock).toBeCalled();
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const selectElement = screen.getByTestId(SELECT_NACIONALITY_DROPDOWN);
    userEvent.selectOptions(selectElement, ['Canadian']);

    await waitForElementToBeRemoved(() => screen.getByText(DEFAULT_RECIPES_MEALS[0]));
    RECIPES_MEALS_AREA_CANADIAN.forEach((mealNames) => {
      expect(screen.getByText(mealNames)).toBeInTheDocument();
    });
  });
});
