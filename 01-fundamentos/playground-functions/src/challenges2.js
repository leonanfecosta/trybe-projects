// Desafio 11
function generatePhoneNumber(array) {
  if (array.length > 11 || array.length < 11) {
    return 'Array com tamanho incorreto.';
  }
  let contNumber = 0;
  for (let index in array) {
    let verifyNumber = array[index];
    for (let index2 in array) {
      if (verifyNumber === array[index2]) contNumber += 1;
    }
    if (contNumber >= 3 || array[index] > 9 || array[index] < 0) {
      return 'não é possível gerar um número de telefone com esses valores';
    }
    contNumber = 0;
  }
  return (
    `(${array[0]}${array[1]})`
    + ` ${array[2]}${array[3]}${array[4]}${array[5]}${array[6]}-${array[7]}${array[8]}${array[9]}${array[10]}`
  );
}

// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  let lineAB = lineA + lineB;
  let lineAC = lineA + lineC;
  let lineBC = lineB + lineC;

  let absoluteLineAB = Math.abs(lineA - lineB);
  let absoluteLineAC = Math.abs(lineA - lineC);
  let absoluteLineBC = Math.abs(lineB - lineC);

  if (lineA > lineAB || lineA > lineAC || lineA > lineBC) {
    return false;
  }
  if (lineB > lineAB || lineB > lineAC || lineB > lineBC) {
    return false;
  }
  if (lineC > lineAB || lineC > lineAC || lineC > lineBC) {
    return false;
  }

  if (
    lineA < absoluteLineAB
    || lineA < absoluteLineAC
    || lineA < absoluteLineBC
  ) {
    return false;
  }
  if (
    lineB < absoluteLineAB
    || lineB < absoluteLineAC
    || lineB < absoluteLineBC
  ) {
    return false;
  }
  if (
    lineC < absoluteLineAB
    || lineC < absoluteLineAC
    || lineC < absoluteLineBC
  ) {
    return false;
  }
  return true;
}

// Desafio 13
function hydrate(string) {
  let numbers = string.match(/\d+/g).map(Number);
  let sum = 0;
  for (let index in numbers) {
    sum += numbers[index];
  }
  if (sum === 1) {
    return `${sum} copo de água`;
  }
  return `${sum} copos de água`;
}
/* console.log(hydrate('1 cachaça, 5 cervejas e 1 copo de vinho'));
 */

module.exports = {
  generatePhoneNumber,
  hydrate,
  triangleCheck,
};
