const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('Verifica se ao executar a função saveCartItems(<ol><li>Item</li></ol>), o localStorage.setItem é chamado', async () => {
    expect.assertions(1);
    await saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Verifica se ao executar a função saveCartItems(<ol><li>Item</li></ol>)  o método localStorage.setItem é chamado com dois parâmetros', async () =>{
    // expect.assertions(2);
    await saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });
})
