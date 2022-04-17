/* eslint-disable sonarjs/cognitive-complexity */
// Desafio 1
function compareTrue(value1, value2) {
  return value1 && value2;
}

// Desafio 2
function calcArea(base, height) {
  return (base * height) / 2;
}

// Desafio 3
function splitSentence(string) {
  let array = string.split(' ');
  return array;
}

// Desafio 4
function concatName(array) {
  let firstWord = array[0];
  let lastWord = array[array.length - 1];

  return (`${lastWord}, ${firstWord}`);
}

// Desafio 5
function footballPoints(wins, ties) {
  let winsPoints = wins * 3;
  let totalPoints = winsPoints + ties;

  return totalPoints;
}

// Desafio 6
function highestCount(numbers) {
  let highestValue = -10000;
  let contNumber = 0;

  for (let index in numbers) {
    if (numbers[index] > highestValue) {
      highestValue = numbers[index];
    }
  }
  for (let index2 in numbers) {
    if (numbers[index2] === highestValue) {
      contNumber += 1;
    }
  }
  return contNumber;
}

console.log(highestCount([-2, -2, -1]));

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  let distanceCat1 = Math.abs(cat1 - mouse);
  let distanceCat2 = Math.abs(cat2 - mouse);

  if (distanceCat1 > distanceCat2) {
    return 'cat2';
  } if (distanceCat2 > distanceCat1) {
    return 'cat1';
  } if (distanceCat1 === distanceCat2) {
    return 'os gatos trombam e o rato foge';
  }
}

// Desafio 8
function fizzBuzz(numbers) {
  let dividerThree = 'fizz';
  let dividerFive = 'buzz';
  let dividerBoth = 'fizzBuzz';
  let notDividerBoth = 'bug!';
  let array = [];

  for (let index in numbers) {
    if (numbers[index] % 3 === 0 && numbers[index] % 5 === 0) {
      array.push(dividerBoth);
    } else if (numbers[index] % 3 === 0) {
      array.push(dividerThree);
    } else if (numbers[index] % 5 === 0) {
      array.push(dividerFive);
    } else if (numbers[index] % 3 !== 0 && numbers[index] % 5 !== 0) {
      array.push(notDividerBoth);
    }
  }
  return array;
}
// Desafio 9
function encode(string) {
  let letters = string.split('');
  let arrayWords = [];

  for (let index in letters) {
    if (
      letters[index] !== 'a'
      && letters[index] !== 'e'
      && letters[index] !== 'i'
      && letters[index] !== 'o'
      && letters[index] !== 'u'
    ) {
      arrayWords.push(letters[index]);
    } else if (letters[index] === 'a') {
      letters[index] = 1;
      arrayWords.push(letters[index]);
    } else if (letters[index] === 'e') {
      letters[index] = 2;
      arrayWords.push(letters[index]);
    } else if (letters[index] === 'i') {
      letters[index] = 3;
      arrayWords.push(letters[index]);
    } else if (letters[index] === 'o') {
      letters[index] = 4;
      arrayWords.push(letters[index]);
    } else if (letters[index] === 'u') {
      letters[index] = 5;
      arrayWords.push(letters[index]);
    }
  }
  return arrayWords.join('');
}

function decode(string) {
  let letters = string.split('');
  let arrayWords = [];

  for (let index in letters) {
    if (
      letters[index] !== '1'
      && letters[index] !== '2'
      && letters[index] !== '3'
      && letters[index] !== '4'
      && letters[index] !== '5'
    ) {
      arrayWords.push(letters[index]);
    } else if (letters[index] === '1') {
      letters[index] = 'a';
      arrayWords.push(letters[index]);
    } else if (letters[index] === '2') {
      letters[index] = 'e';
      arrayWords.push(letters[index]);
    } else if (letters[index] === '3') {
      letters[index] = 'i';
      arrayWords.push(letters[index]);
    } else if (letters[index] === '4') {
      letters[index] = 'o';
      arrayWords.push(letters[index]);
    } else if (letters[index] === '5') {
      letters[index] = 'u';
      arrayWords.push(letters[index]);
    }
  }
  return arrayWords.join('');
}

// Desafio 10
function techList(technologyName, name) {
  let array = [];

  if (
    technologyName.length === 0
    || technologyName === null
    || technologyName === undefined
  ) {
    return 'Vazio!';
  }

  technologyName.sort();
  for (let index in technologyName) {
    array.push({
      tech: technologyName[index],
      name: name,
    });
  }
  return array;
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
  techList,
};
