import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente About', () => {
  it('Deve renderizar o componente About e verificar o título', () => {
    renderWithRouter(<About />);

    const aboutTitle = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });

    expect(aboutTitle).toBeInTheDocument();
  });

  it('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const aboutParagraphs = screen.getAllByText(/Pokémons/i);

    expect(aboutParagraphs).toHaveLength(2);
  });

  it('Teste se a página contém uma imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const aboutImage = screen.getByRole('img', { name: /Pokédex/i });

    expect(aboutImage).toBeInTheDocument();
    expect(aboutImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
