import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa Pokedex', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('É exibido o próximo pokémon quando o botão Próximo pokémon é clicado', () => {
    const pokemonsNames = pokemons.map((pokemon) => pokemon.name);
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();

    pokemonsNames.forEach((pokemon) => {
      expect(pokemonName).toHaveTextContent(pokemon);
      if (pokemon === 'Dragonair') {
        userEvent.click(nextButton);
        expect(pokemonName.textContent).toBe('Pikachu');
      }
      userEvent.click(nextButton);
    });
  });

  it('É mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemonImg = screen.getAllByRole('img');
    expect(pokemonImg.length).toBe(1);

    const nextPokemonButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    userEvent.click(nextPokemonButton);
    expect(pokemonImg.length).toBe(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const NUMBER_OF_FILTERS = 7;

    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filterButtons.length).toBe(NUMBER_OF_FILTERS);
  });

  it('Deve existir um botão de filtragem para cada tipo de pokémon', () => {
    const pokemonsTypes = pokemons.map((pokemon) => pokemon.type);
    renderWithRouter(<App />);

    pokemonsTypes.forEach((type) => {
      const filterButton = screen.getByRole('button', { name: type });
      expect(filterButton).toBeInTheDocument();
    });

    const allButtons = screen.getAllByTestId('pokemon-type-button');
    allButtons.forEach((button) => expect(button).toBeInTheDocument());
  });

  it('Ao clicar no botão de filtro, são exibidos apenas os Pokémons do tipo"', () => {
    renderWithRouter(<App />);

    const PhychicButton = screen.getByRole('button', { name: /Psychic/i });
    userEvent.click(PhychicButton);

    const pokemonType = screen.getByTestId('pokemon-type');
    const allButton = screen.getByRole('button', { name: /All/i });
    expect(allButton).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Psychic');
  });

  it('A Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: /All/i });
    expect(allButton).toBeInTheDocument();

    userEvent.click(allButton);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Pikachu');
  });
});
