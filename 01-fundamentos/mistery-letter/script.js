const btnCriarCarta = document.querySelector('#criar-carta');
const inputCarta = document.querySelector('#carta-texto');
const cartaGerada = document.querySelector('#carta-gerada');
const divContador = document.querySelector('#contador');

const classesEstilo = [`newspaper`, `magazine1`, `magazine2`];
const classesTamanho = [`medium`, `big`, `reallybig`];
const classesRotacao = [`rotateleft`, `rotateright`];
const classesInclinacao = [`skewleft`, `skewright`];

/*Fonte: https://pt.stackoverflow.com/questions/73214/criar-uma-combina%C3%A7%C3%A3o-aleatoria-com-classes-css-utilizando-javascript-ou-jquery */
function sortearClasses(array) {
  let aletorio = Math.floor(Math.random() * array.length);
  return array[aletorio];
}

function criarCarta() {
  btnCriarCarta.addEventListener('click', () => {
    const palavras = inputCarta.value.split(' ');
    const textoInput = inputCarta.value;
    const espacos = textoInput.trim();
    if (textoInput === null || textoInput === undefined || espacos === '') {
      cartaGerada.innerHTML = 'Por favor, digite o conteúdo da carta.';
    } else if (inputCarta.value.length > 0) {
      cartaGerada.innerHTML = '';
      divContador.innerHTML = '';
      contador();

      for (let i = 0; i < palavras.length; i += 1) {
        const newSpan = document.createElement('span');
        newSpan.innerHTML = palavras[i];

        cartaGerada.appendChild(newSpan);

        let estilo = sortearClasses(classesEstilo);
        let tamanho = sortearClasses(classesTamanho);
        let rotacao = sortearClasses(classesRotacao);
        let inclinacao = sortearClasses(classesInclinacao);

        newSpan.className =
          estilo + ' ' + tamanho + ' ' + inclinacao + ' ' + rotacao;
      }
    }
  });
}
criarCarta();

function mudarClasse() {
  cartaGerada.addEventListener('click', function (event) {
    let estilo = sortearClasses(classesEstilo);
    let tamanho = sortearClasses(classesTamanho);
    let rotacao = sortearClasses(classesRotacao);
    let inclinacao = sortearClasses(classesInclinacao);
    const palavras = inputCarta.value.split(' ');

    for (let i = 0; i < palavras.length; i += 1) {
      event.target.classList = '';
      event.target.className =
        estilo + ' ' + tamanho + ' ' + inclinacao + ' ' + rotacao;
    }
  });
}

mudarClasse();

function contador() {
  const palavras = inputCarta.value.split(' ');

  newP = document.createElement('p');

  if(palavras.length === 1) {
    newP.innerHTML = "Esta carta possui " + palavras.length + ' palavra!'
  } else if(palavras.length >= 2){
    newP.innerHTML = "Esta carta possui " + palavras.length + ' palavras!'
  }
  newP.id = 'carta-contador';
  divContador.appendChild(newP);
}
