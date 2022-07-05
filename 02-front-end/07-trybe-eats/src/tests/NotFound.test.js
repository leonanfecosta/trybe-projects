import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('teste do NotFound', () => {
  it('avalia a renderização dos elementos do Header', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/drinks/nationalities');

    expect(screen.getByText(/not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Sorry, this page does not exist/i)).toBeInTheDocument();
  });
});
