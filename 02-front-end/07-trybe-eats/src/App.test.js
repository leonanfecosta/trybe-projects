import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from './App';

const INPUT_EMAIL = 'email-input';
const INPUT_PASSWORD = 'password-input';
const LOGIN_BUTTON = 'login-submit-btn';

const ARRAY_LOGIN_ELEMENTS = [
  INPUT_EMAIL,
  INPUT_PASSWORD,
  LOGIN_BUTTON,
];

test('Farewell, front-end', () => {
  renderWithRouter(<App />);
  ARRAY_LOGIN_ELEMENTS.forEach((dataTest) => {
    expect(screen.getByTestId(dataTest)).toBeInTheDocument();
  });
});
