const data = require('../data/zoo_data');

const { species } = data;

// const noIncludesNames = () => species.reduce((specie, currentSpecie) => {
//   if (!specie[currentSpecie.location]) {
//     specie[currentSpecie.location] = species
//       .filter((animal) => animal.location === currentSpecie.location)
//       .map((element) => element.name);
//   }
//   return specie;
// }, {});
// refatorar o reduce quebrando em partes menores como visto na mentoria com a fernanda

// criação de um objeto com a estrutura certa, dica do Heitor na mentoria
const object = () => {
  const obj = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };
  return obj;
};

const noIncludesNames = () => {
  const result = object();

  species.forEach((specie) => {
    result[specie.location].push(specie.name);
  });
  return result;
};

const onlyIncludesNames = () => {
  const result = object();

  species.forEach((specie) => {
    const names = specie.residents.map((element) => element.name);

    result[specie.location].push({ [specie.name]: names });
  });
  return result;
};

const IncludesNamesSorted = () => {
  const result = object();

  species.forEach((specie) => {
    const names = specie.residents.map((element) => element.name).sort();

    result[specie.location].push({ [specie.name]: names });
  });
  return result;
};

const sex = (options) => {
  const result = object();

  species.forEach((specie) => {
    const names = specie.residents
      .filter((resident) => resident.sex === options.sex)
      .map((element) => element.name);

    result[specie.location].push({ [specie.name]: names });
  });
  return result;
};

const sexSorted = (options) => {
  const result = object();

  species.forEach((specie) => {
    const names = specie.residents
      .filter((resident) => resident.sex === options.sex)
      .map((element) => element.name)
      .sort();

    result[specie.location].push({ [specie.name]: names });
  });
  return result;
};

// dica da Fernanda: quebrar as condições em outra função de verificação

const conditionsSex = (options) => {
  if (options.includeNames && !options.sorted) {
    return sex(options);
  }
  return sexSorted(options);
};

const conditionsNamesSorted = (options) => {
  if (options.includeNames && !options.sex) {
    return IncludesNamesSorted();
  }
  return conditionsSex(options);
};

const conditionsIncludeNames = (options) => {
  if (options.includeNames && !options.sex && !options.sorted) {
    return onlyIncludesNames();
  }
  return conditionsNamesSorted(options);
};

function getAnimalMap(options) {
  if (!options || !options.includeNames) {
    return noIncludesNames();
  }

  return conditionsIncludeNames(options);
}

module.exports = getAnimalMap;
