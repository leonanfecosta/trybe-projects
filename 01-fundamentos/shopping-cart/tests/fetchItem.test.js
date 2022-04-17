require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Verifica se fetchItem é uma função', async () => {
    expect.assertions(1);
    expect(typeof fetchItem).toBe('function');
  });

  it('Verifica se ao chamar a função fetchItem com o argumento "MLB1615760527" a função fetch é executada', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se ao chamar a função com o argumento "MLB1615760527" a função a função fetch utiliza o endpoint correto', async () => {
    expect.assertions(1);
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('Verifica se o retorno da função fetchItem("MLB1615760527") é igual ao objeto de item', async () => {
    expect.assertions(1);
    const response = await fetchItem('MLB1615760527');
    expect(response).toEqual(item);
  });

  it('Verifica se ao chamar a função fetchItem sem argumento retorna o erro esperado', async () => {
    expect.assertions(1);
    const response = await fetchItem();
    expect(response).toEqual(new Error('You must provide an url'))
  });
});
