const pixelBoard = document.getElementById('pixel-board');
const btBlack = document.getElementById('black');

window.onload = function () {
  defineBlack();
  creatPixel(5);
};
// função criada com a ajuda do Matheus Guedes na mentoria
function creatPixel(size) {
  for (let i = 0; i < size; i += 1) {
    let line = document.createElement('div');
    pixelBoard.appendChild(line);
    line.className = 'line';

    for (let j = 0; j < size; j += 1) {
      let pixel = document.createElement('div');
      pixel.className = 'pixel';
      line.appendChild(pixel);
    }
  }
}

function defineBlack() {
  btBlack.classList.add('selected');
}

function selectedColor() {
  let boxColor = document.getElementById('color-palette');
  boxColor.addEventListener('click', function (event) {
    let selected = document.querySelector('.selected');
    selected.classList.remove('selected');
    event.target.classList.add('selected');
  });
}
selectedColor();

function setPixelColor() {
  pixelBoard.addEventListener('click', function (event) {
    let selected = document.querySelector('.selected');
    let color = window.getComputedStyle(selected);
    event.target.style.backgroundColor =
      color.getPropertyValue('background-color');
  });
}
setPixelColor();

let btClear = document.querySelector('#clear-board');
function clearBoard() {
  let pixel = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixel.length; i += 1) {
    pixel[i].style.backgroundColor = 'white';
  }
}
btClear.addEventListener('click', clearBoard);

let inputBoardSize = document.getElementById('board-size');
let btnGenerateBoard = document.getElementById('generate-board');

function removeBoard() {
  pixelBoard.innerHTML = '';
}

function checkBoardSize() {
  if (inputBoardSize.value > 50) {
    inputBoardSize.value = 50;
  }
  if (inputBoardSize.value < 5) {
    inputBoardSize.value = 5;
  }
}
// Função criada com a ajuda do Matheus e Tiago na monitoria
btnGenerateBoard.addEventListener('click', () => {
  if (
    inputBoardSize.value === 0 ||
    inputBoardSize.value === '' ||
    inputBoardSize.value === undefined
  ) {
    alert('Board inválido!');
  } else {
    checkBoardSize();
    removeBoard();
    creatPixel(inputBoardSize.value);
  }
});
