export const SET_EMAIL = 'SET_EMAIL';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const SET_EXPENSES = 'SET_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export function setEmail(email) {
  return {
    type: SET_EMAIL,
    payload: email,
  };
}

export function setCurrencies(currencies) {
  return {
    type: SET_CURRENCIES,
    payload: currencies,
  };
}

export const fetchCurrencies = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');
    dispatch(setCurrencies(currencies));
  } catch (error) {
    console.log(error);
  }
};

export function setExpenses(expenses) {
  return {
    type: SET_EXPENSES,
    payload: expenses,
  };
}

export const fetchExpenses = (expense) => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const exchangeRates = { ...data };
    const expenses = { exchangeRates, ...expense };
    dispatch(setExpenses(expenses));
  } catch (error) {
    console.log(error);
  }
};

export function deleteExpense(expense) {
  return {
    type: DELETE_EXPENSE,
    payload: expense,
  };
}
