const data = require('../data/zoo_data');

const { species } = data;

function countAnimals(animal) {
  const obj = {};
  if (!animal) {
    species.forEach((specie) => { obj[specie.name] = specie.residents.length; });
    return obj;
  }

  const findSpecie = species.find((specie) => specie.name === animal.specie);
  if (animal.sex) {
    return findSpecie.residents.filter((resident) => resident.sex === animal.sex).length;
  }
  return findSpecie.residents.length;
}

module.exports = countAnimals;
