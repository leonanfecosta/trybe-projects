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
import drinksById from './mocks/drinksById';

const EXPLORE_BUTTON_SURPRISE = 'explore-surprise';

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

describe('Testa os elementos da tela de explorar comidas', () => {
  const pathToExploreDrinks = () => {
    const loginEmail = screen.getByTestId('email-input');
    const loginPassword = screen.getByTestId('password-input');
    const enterBtn = screen.getByTestId('login-submit-btn');
    userEvent.type(loginEmail, 'teste@teste.com');
    userEvent.type(loginPassword, '123456789');
    userEvent.click(enterBtn);
    const exploreBtn = screen.getByTestId('explore-bottom-btn');
    userEvent.click(exploreBtn);
    const exploreDrinksBtn = screen.getByTestId('explore-drinks');
    userEvent.click(exploreDrinksBtn);
  };

  test('Testa se tem todos os data-testids', () => {
    renderWithRouter(<App />);
    pathToExploreDrinks();
    const byIngredient = screen.getByTestId('explore-by-ingredient');
    const surpriseMe = screen.getByTestId('explore-surprise');
    expect(byIngredient).toBeInTheDocument();
    expect(surpriseMe).toBeInTheDocument();
  });

  test('Testa se redireciona a pessoa para a tela de explorar por ingrediente', () => {
    const { history } = renderWithRouter(<App />);
    pathToExploreDrinks();
    const linkByIngredient = screen.getByRole('link', { name: /By Ingredient/i });
    userEvent.click(linkByIngredient);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explore/drinks/ingredients');
  });

  test('Testa se redireciona para a tela de bebida com receita surpresa', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch').mockImplementation(async (URL) => (
        { json: async () => URLS[URL] || expect(URL).validURL(URLS) }
      ));

    renderWithRouter(<App />);
    pathToExploreDrinks();
    userEvent.click(screen.getByTestId(EXPLORE_BUTTON_SURPRISE));
    expect(fetchMock).toBeCalled();

    await waitForElementToBeRemoved(() => screen.getByTestId(EXPLORE_BUTTON_SURPRISE));

    await waitForElement(async () => {
      expect(await screen.findByText(drinksById.drinks[0].strDrink)).toBeInTheDocument();
    });
  });
});
