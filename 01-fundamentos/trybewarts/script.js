const inputEmail = document.getElementById('inp-email');
const inputSenha = document.getElementById('inp-senha');
const btnLogin = document.getElementById('btn-entrar');
const inputAceita = document.querySelector('#agreement');
const btnEnviar = document.querySelector('#submit-btn');
const contador = document.getElementById('counter');
const textArea = document.getElementById('textarea');
const inputNome = document.getElementById('input-name');
const inputSobrenome = document.getElementById('input-lastname');
const form = document.getElementById('evaluation-form');
const inputEmailForm = document.getElementById('input-email');
const casa = document.getElementById('house');
const familia = document.querySelectorAll('.family');
const avaliacao = document.querySelectorAll('.rate');
const conteudo = document.querySelectorAll('.subject');

function validaEmail() {
  if (
    inputEmail.value === 'tryber@teste.com' && inputSenha.value === '123456'
  ) {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}
btnLogin.addEventListener('click', validaEmail);

/* function habilitaBotao() {
  if (inputAceita.checked) {
    btnEnviar.disabled = false;
  } else {
    btnEnviar.disabled = true;
  }
}
inputAceita.addEventListener('click', habilitaBotao); */

function habilitaBotao() {
  btnEnviar.disabled = !inputAceita.checked;
}
inputAceita.addEventListener('change', habilitaBotao);

function contadorCaracter() {
  contador.innerText = 500 - textArea.value.length;
}
textArea.addEventListener('keyup', contadorCaracter);

function anulaBtnPadrao(event) {
  event.preventDefault();
}

/* Requisito 21 */

/* Função para gerar os textos necessários */
function gerarParagrafo(text) {
  const newP = document.createElement('p');
  newP.innerText = text;
  form.appendChild(newP);
}

/* Funções para recuperar os valores dos campos do formulário */

/* Recuperar o valor do select referente à casa

Referência https://metring.com.br/como-obter-o-valor-de-um-select-em-javascript */

function recuperarCasa() {
  const valorCasa = casa.options[casa.selectedIndex].value;
  return valorCasa;
}

/* Recuperar o valor referente a familia

Referência https://pt.stackoverflow.com/questions/82968/pegar-valor-de-um-button-radio */

function recuperarFamilia() {
  for (let i = 0; i < familia.length; i += 1) {
    if (familia[i].checked) {
      return familia[i].value;
    }
  }
}

/* Recuperar valores referentes ao conteúdo */

function recuperarConteudo() {
  const arrayConteudo = [];
  for (let i = 0; i < conteudo.length; i += 1) {
    if (conteudo[i].checked) {
      arrayConteudo.push(conteudo[i].value);
    }
  }
  return arrayConteudo.join(', ');
}

/* Recuperar valor refernte a avaliação */

function recuperarAvaliacao() {
  for (let i = 0; i < avaliacao.length; i += 1) {
    if (avaliacao[i].checked) {
      return avaliacao[i].value;
    }
  }
}

/* Função para gerar todo o conteudo novo */

function gerarForm() {
  form.innerHTML = '';

  gerarParagrafo(`Nome: ${inputNome.value} ${inputSobrenome.value}`);
  gerarParagrafo(`Email: ${inputEmailForm.value}`);
  gerarParagrafo(`Casa: ${recuperarCasa()}`);
  gerarParagrafo(`Família: ${recuperarFamilia()}`);
  gerarParagrafo(`Matérias: ${recuperarConteudo()}`);
  gerarParagrafo(`Avaliação: ${recuperarAvaliacao()}`);
  gerarParagrafo(`Observações: ${textArea.value}`);
}

btnEnviar.addEventListener('click', anulaBtnPadrao);
btnEnviar.addEventListener('click', gerarForm);
