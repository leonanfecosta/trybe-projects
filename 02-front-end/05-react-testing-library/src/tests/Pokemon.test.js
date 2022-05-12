import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente Pokemon', () => {
  it('É renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    const pokemon = pokemons[0];
    const { name, type, image, averageWeight } = pokemon;

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonAverageWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByAltText(`${name} sprite`);

    expect(pokemonName).toHaveTextContent(name);
    expect(pokemonType).toHaveTextContent(type);
    expect(pokemonAverageWeight).toHaveTextContent(
      `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
    );
    expect(pokemonImg).toHaveAttribute('src', image);
  });

  it('O card deve contar um link para exibir detalhes do pokemon.', () => {
    renderWithRouter(<App />);

    const pokemon = pokemons[0];
    const { id } = pokemon;
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });

    expect(moreDetailsLink).toBeInTheDocument();
    expect(moreDetailsLink).toHaveAttribute('href', `/pokemons/${id}`);
  });

  it('Ao clicar no link de detalhes é feito o redirecionamento', () => {
    renderWithRouter(<App />);

    const pokemon = pokemons[0];
    const { name } = pokemon;
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetailsLink);

    const pokemonTitle = screen.getByRole('heading', {
      level: 2,
      name: `${name} Details`,
    });

    expect(pokemonTitle).toBeInTheDocument();
  });

  it('A URL deve mudar para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);

    const pokemon = pokemons[0];
    const { id } = pokemon;
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetailsLink);

    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  it('Existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);

    const pokemon = pokemons[0];
    const { name } = pokemon;
    const moreDetailsLink = screen.getByRole('link', { name: /More details/i });

    userEvent.click(moreDetailsLink);

    const favoritePokemon = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favoritePokemon).toBeInTheDocument();

    userEvent.click(favoritePokemon);

    const favoriteIcon = screen.getByAltText(`${name} is marked as favorite`);
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
