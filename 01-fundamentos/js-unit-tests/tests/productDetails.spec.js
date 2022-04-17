const productDetails = require("../src/productDetails");

/*
  Dadas duas strings que representam nomes de produtos, retorne um array contendo dois objetos com os detalhes dos respectivos produtos.

  Parâmetros:
  - Uma string;
  - Uma string;

  Comportamento:
  productDetails('Alcool gel', 'Máscara') // Retorna:
  [
    {
      name: 'Alcool gel'
      details: {
        productId: 'Alcool gel123'
      }
    },
    {
      name: 'Máscara'
      details: {
        productId: 'Máscara123'
      }
    }
  ]

*/

describe("6 - Implemente os casos de teste para a função `productDetails`", () => {
  it("Teste se productDetails é uma função.", () => {
    expect(typeof productDetails).toBe("function");
  });
  // Teste se o retorno da função é um array.
  it("Testa se o retorno da função é um array", () => {
    const actual = Array.isArray(productDetails("Alcool gel", "Máscara"));
    expect(actual).toBe(true);
  });
  // Teste se o array retornado pela função contém dois itens dentro.
  it("Testa se o array retornado pela função contém dois itens", () => {
    expect(productDetails("Alcool gel", "Mascara")).toHaveLength(2);
  });
  // Teste se os dois itens dentro do array retornado pela função são objetos.
  it("Testa se os dois itens dentro do array retornado pela função são objetos", () => {
    const firstResult = productDetails("Alcool gel", "Mascara")[0];
    const secondResult = productDetails("Alcool gel", "Mascara")[1];
    expect(typeof firstResult).toBe("object");
    expect(typeof secondResult).toBe("object");
  });
  // Teste se quando passado parâmetros diferentes entre si, os dois objetos também são diferentes entre si.
  it("Testa se o retorno da função são objetos diferentes entre si", () => {
    const isDiferent = Object.is(
      productDetails("Alcool gel", "Máscara")[0],
      productDetails("Alcool gel", "Mascara")[1]
    );
    expect(isDiferent).toBe(false);
  });
  // Teste se os dois productIds terminam com 123.
  it("Testa se os dois productIds terminam com 123", () => {
    const firstProductId = productDetails()[0].details.productId.endsWith('123');
    const secondProductId = productDetails()[1].details.productId.endsWith('123');

    expect(firstProductId).toBe(true);
    expect(secondProductId).toBe(true);
  });
});
