import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente App', () => {
  it('Deve renderizar o componente App e verificar o título', () => {
    renderWithRouter(<App />);

    const pokedexTitle = screen.getByRole('heading', {
      level: 1,
      name: 'Pokédex',
    });
    expect(pokedexTitle).toBeInTheDocument();
  });

  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /Home/i });
    const aboutLink = screen.getByRole('link', { name: /About/i });
    const favoritesLink = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritesLink).toBeInTheDocument();
  });

  it('A aplicação é redirecionada para a URL / ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /Home/i });
    userEvent.click(homeLink);

    expect(history.location.pathname).toBe('/');
  });

  it('A aplicação é redirecionada para a URL /about, ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /About/i });
    userEvent.click(aboutLink);

    expect(history.location.pathname).toBe('/about');
  });

  it('A aplicação é redirecionada para /favorites, ao clicar no link Favorites', () => {
    const { history } = renderWithRouter(<App />);

    const favoritesLink = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });

    userEvent.click(favoritesLink);

    expect(history.location.pathname).toBe('/favorites');
  });

  it('A aplicação é redirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/unknown-url');

    const notFoundTitle = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(notFoundTitle).toBeInTheDocument();
  });
});
