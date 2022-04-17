const data = require('../data/zoo_data');

const { species, employees } = data;

function getOldestFromFirstSpecies(id) {
  //  encontrar o funcionario pelo id
  const findEmployee = employees.find((employee) => employee.id === id);
  //  encontrar a primeira especie gerenciada pelo funcionario
  const findSpecie = findEmployee.responsibleFor[0];
  //  buscar informações sobre a primeira especie na chave species
  const getInfo = species.find((specie) => specie.id === findSpecie);
  //  ordenar em ordem decrescente
  const arr = getInfo.residents.map((element) => element);
  const result = arr.sort((a, b) => b.age - a.age);
  return [result[0].name, result[0].sex, result[0].age];
}
console.log(getOldestFromFirstSpecies('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));
module.exports = getOldestFromFirstSpecies;
