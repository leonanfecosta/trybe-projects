const data = require('../data/zoo_data');

const { species } = data;

function getAnimalsOlderThan(animal, age) {
  const residents = species.find((specie) => specie.name === animal);
  const everyAge = residents.residents.every((resident) => resident.age > age);

  return everyAge;
}

module.exports = getAnimalsOlderThan;
