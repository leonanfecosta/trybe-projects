import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const VALID_EMAIL = 'teste@teste.com';
const VALID_PASSWORD = 'teste1234';

const INPUT_EMAIL = 'email-input';
const INPUT_PASSWORD = 'password-input';
const LOGIN_BUTTON = 'login-submit-btn';

const FOOTER_DRINKS_BUTTON = 'drinks-bottom-btn';
const FOOTER_EXPLORE_BUTTON = 'explore-bottom-btn';
const FOOTER_FOOD_BUTTON = 'food-bottom-btn';
const ARRAY_FOOTER_BUTTONS = [
  FOOTER_DRINKS_BUTTON,
  FOOTER_EXPLORE_BUTTON,
  FOOTER_FOOD_BUTTON,
];

describe('Teste do Footer', () => {
  it('avalia a renderização dos elementos do Footer', () => {
    renderWithRouter(<App />);
    userEvent.type(screen.getByTestId(INPUT_EMAIL), VALID_EMAIL);
    userEvent.type(screen.getByTestId(INPUT_PASSWORD), VALID_PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_BUTTON));

    ARRAY_FOOTER_BUTTONS.forEach((button) => {
      expect(screen.getByTestId(button)).toBeInTheDocument();
    });
  });

  it('avalia a mudança para página de Drinks', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.type(screen.getByTestId(INPUT_EMAIL), VALID_EMAIL);
    userEvent.type(screen.getByTestId(INPUT_PASSWORD), VALID_PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_BUTTON));

    userEvent.click(screen.getByTestId(FOOTER_DRINKS_BUTTON));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/drinks');
  });

  it('avalia a mudança para página de Explore', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.type(screen.getByTestId(INPUT_EMAIL), VALID_EMAIL);
    userEvent.type(screen.getByTestId(INPUT_PASSWORD), VALID_PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_BUTTON));

    userEvent.click(screen.getByTestId(FOOTER_EXPLORE_BUTTON));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explore');
  });

  it('avalia a mudança para página de Explore', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.type(screen.getByTestId(INPUT_EMAIL), VALID_EMAIL);
    userEvent.type(screen.getByTestId(INPUT_PASSWORD), VALID_PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_BUTTON));

    userEvent.click(screen.getByTestId(FOOTER_FOOD_BUTTON));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/foods');
  });
});
