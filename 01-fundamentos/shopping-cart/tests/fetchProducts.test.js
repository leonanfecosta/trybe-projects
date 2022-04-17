require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Verifica se fetchProducts é uma função', async () => {
    expect.assertions(1);
    expect(typeof fetchProducts).toBe('function');
  });

  it('Verifica se ao chamar a função fetchProducts com o argumento "computador" a função fetch é executada', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se ao chamar a função com o argumento "computador" a função a função fetch utiliza o endpoint correto', async () => {
    expect.assertions(1);
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('Verifica se o retorno da função fetchProducts("computador") é igual ao objeto de computadorSearch', async () => {
    expect.assertions(1);
    const response = await fetchProducts('computador');
    expect(response).toEqual(computadorSearch);
  });

  it('Verifica se ao chamar a função fetchProducts sem argumento retorna o erro esperado', async () => {
    expect.assertions(1);
    const response = await fetchProducts();
    expect(response).toEqual(new Error('You must provide an url'))
  });
});
