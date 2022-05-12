import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa FavoritePokemons', () => {
  it('É exibida "No favorite pokemon found", caso não tenha pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavoritePokemons = screen.getByText('No favorite pokemon found');
    expect(noFavoritePokemons).toBeInTheDocument();
  });

  it('São exibidos todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsButton = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetailsButton);

    const favoritePokemons = screen.getByLabelText(/Pokémon Favoritado?/i);
    expect(favoritePokemons).toBeInTheDocument();
    userEvent.click(favoritePokemons);
    expect(favoritePokemons).toBeChecked();

    const favoritesLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favoritesLink);
    expect(history.location.pathname).toBe('/favorites');

    const pokemonCard = screen.getByRole('img', { name: /Pikachu sprite/i });
    expect(pokemonCard).toBeInTheDocument();
  });
});
