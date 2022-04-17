const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Verifica se ao executar a função, o método localStorage.getItem é chamado', async () => {
    expect.assertions(1);
    await getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('Verifica se ao executar a função, o método localStorage.getItem é chamado com "cartItems" como parametro', async () => {
    expect.assertions(1);
    await getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
