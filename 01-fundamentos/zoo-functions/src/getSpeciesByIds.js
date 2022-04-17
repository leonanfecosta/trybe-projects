const data = require('../data/zoo_data');

const { species } = data;

function getSpeciesByIds(...ids) {
  const findId = ids.map((id) => species.find((specie) => specie.id === id));
  return findId;
}

module.exports = getSpeciesByIds;
