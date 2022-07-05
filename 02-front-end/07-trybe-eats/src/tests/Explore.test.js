import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa os elementos da tela de explorar', () => {
  const pathToExplore = () => {
    const loginEmail = screen.getByTestId('email-input');
    const loginPassword = screen.getByTestId('password-input');
    const enterBtn = screen.getByTestId('login-submit-btn');
    userEvent.type(loginEmail, 'teste@teste.com');
    userEvent.type(loginPassword, '123456789');
    userEvent.click(enterBtn);
    const exploreBtn = screen.getByTestId('explore-bottom-btn');
    userEvent.click(exploreBtn);
  };

  test('Testa se tem os data-testids explore-foods e explore-drinks.', () => {
    renderWithRouter(<App />);
    pathToExplore();
    const exploreFoods = screen.getByTestId('explore-foods');
    const exploreDrinks = screen.getByTestId('explore-drinks');
    expect(exploreFoods).toBeInTheDocument();
    expect(exploreDrinks).toBeInTheDocument();
  });

  test('Testa se o nomes dos botões são "Explore Foods" e "Explore Drinks', () => {
    renderWithRouter(<App />);
    pathToExplore();
    const btnExploreFoods = screen.getByRole('button', { name: /Explore Foods/i });
    const btnExploreDrinks = screen.getByRole('button', { name: /Explore Drinks/i });
    expect(btnExploreFoods).toBeInTheDocument();
    expect(btnExploreDrinks).toBeInTheDocument();
  });

  test('Testa se redireciona a pessoa usuária para "Explore Foods"', () => {
    const { history } = renderWithRouter(<App />);
    pathToExplore();
    const linkExploreFoods = screen.getByRole('link', { name: /Explore Foods/i });
    userEvent.click(linkExploreFoods);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explore/foods');
  });

  test('Testa se redireciona a pessoa usuária para "Explore Drinks"', () => {
    const { history } = renderWithRouter(<App />);
    pathToExplore();
    const linkExploreDrinks = screen.getByRole('link', { name: /Explore Drinks/i });
    userEvent.click(linkExploreDrinks);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explore/drinks');
  });
});
