import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const HEADER_SEARCH_BUTTON = 'search-top-btn';
const PROFILE_TOP_BUTTON = 'profile-top-btn';
const TITLE = 'page-title';

describe('teste do Header', () => {
  it('avalia a renderização dos elementos do Header', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    expect(screen.getByTestId(PROFILE_TOP_BUTTON)).toBeInTheDocument();
    expect(screen.getByTestId(HEADER_SEARCH_BUTTON)).toBeInTheDocument();
    expect(screen.getByTestId(TITLE)).toBeInTheDocument();
  });

  it('avalia a renderização dos elementos na página Explore', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    expect(screen.getByTestId(PROFILE_TOP_BUTTON)).toBeInTheDocument();
    expect(screen.queryByTestId(HEADER_SEARCH_BUTTON)).not.toBeInTheDocument();
    expect(screen.getByTestId(TITLE)).toBeInTheDocument();
  });
});
