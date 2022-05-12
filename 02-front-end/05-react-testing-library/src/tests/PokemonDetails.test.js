import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa do componente PokemonDetails', () => {
  it('As informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const pokemon = pokemons[0];
    const { name, summary } = pokemon;
    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetailsLink);

    const pokemonName = screen.getByRole('heading', {
      level: 2,
      name: `${name} Details`,
    });
    const summaryTitle = screen.getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });
    const pokemonSummary = screen.getByText(summary);
    expect(pokemonName).toBeInTheDocument();
    expect(moreDetailsLink).not.toBeInTheDocument();
    expect(summaryTitle).toBeInTheDocument();
    expect(pokemonSummary).toBeInTheDocument();
  });

  it('Existe na página uma seção com os mapas contendo as localizações', () => {
    renderWithRouter(<App />);

    const pokemon = pokemons[0];
    const { name } = pokemon;

    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetailsLink);

    const locationTitle = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${name}`,
    });
    expect(locationTitle).toBeInTheDocument();

    pokemon.foundAt.forEach(({ location, map }, index) => {
      const pokemonLocation = screen.getByText(location);
      const pokemonMap = screen.getAllByAltText(`${name} location`)[index];
      expect(pokemonLocation).toBeInTheDocument();
      expect(pokemonMap).toHaveAttribute('src', map);
    });
  });

  it('O usuário pode favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetailsLink);

    const favoritePokemon = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favoritePokemon).toBeInTheDocument();
    userEvent.click(favoritePokemon);
    expect(favoritePokemon).toBeChecked();
  });
});
