import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa os elementos da tela de perfil', () => {
  const pathToProfile = () => {
    const loginEmail = screen.getByTestId('email-input');
    const loginPassword = screen.getByTestId('password-input');
    const enterBtn = screen.getByTestId('login-submit-btn');
    userEvent.type(loginEmail, 'teste@teste.com');
    userEvent.type(loginPassword, '123456789');
    userEvent.click(enterBtn);
    const profileImg = screen.getByTestId('profile-top-btn');
    userEvent.click(profileImg);
  };

  test('Testa o data-testid do email e de todos os botões e se estão na tela', () => {
    renderWithRouter(<App />);
    pathToProfile();
    const profileEmail = screen.getByTestId('profile-email');
    const profileDoneBtn = screen.getByTestId('profile-done-btn');
    const profileFavoriteBtn = screen.getByTestId('profile-favorite-btn');
    const profileLogoutBtn = screen.getByTestId('profile-logout-btn');
    expect(profileEmail).toBeInTheDocument();
    expect(profileDoneBtn).toBeInTheDocument();
    expect(profileFavoriteBtn).toBeInTheDocument();
    expect(profileLogoutBtn).toBeInTheDocument();
  });

  test('Testa se redireciona a pessoa usuária para "Favorite Recipes"', () => {
    const { history } = renderWithRouter(<App />);
    pathToProfile();
    const linkFavoriteRecipes = screen.getByRole('link', { name: /Favorite Recipes/i });
    userEvent.click(linkFavoriteRecipes);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorite-recipes');
  });

  test('Testa se redireciona a pessoa usuária para "Done Recipes"', () => {
    const { history } = renderWithRouter(<App />);
    pathToProfile();
    const linkDoneRecipes = screen.getByRole('link', { name: /Done Recipes/i });
    userEvent.click(linkDoneRecipes);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/done-recipes');
  });

  test('Testa se redireciona a pessoa usuária para "Logout"', () => {
    const { history } = renderWithRouter(<App />);
    pathToProfile();
    const linkLogout = screen.getByRole('button', { name: /Logout/i });
    userEvent.click(linkLogout);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
    expect(localStorage.getItem('user')).toBeNull();
  });

  test('Testa se "Email não informado aparece na tela"', () => {
    renderWithRouter(<App />);
    pathToProfile();
    const invalidEmail = screen.getByRole('heading', {
      level: 1, name: /Email não informado/i });
    expect(invalidEmail).toBeInTheDocument();
  });
});
