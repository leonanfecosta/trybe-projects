import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('Componente NotFound.js', () => {
  it('Teste se página contém um h2 com o texto "Page requested not found 😭"', () => {
    renderWithRouter(<NotFound />);
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Page requested not found/i,
      }),
    ).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);

    const img = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
