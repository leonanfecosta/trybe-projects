let inputTasks = document.querySelector('#texto-tarefa');
let btnAddTask = document.querySelector('#criar-tarefa');
let taskList = document.querySelector('#lista-tarefas');
let btnRemoveAllTask = document.querySelector('#apaga-tudo');
let btnRemoveCompletedTasks = document.querySelector('#remover-finalizados');
let btnRemoveSelectedTask = document.querySelector('#remover-selecionado');
let btnSaveTasks = document.querySelector('#salvar-tarefas');
let btnMoveUp = document.querySelector('#mover-cima');
let btnMoveDown = document.querySelector('#mover-baixo');

function addNewTasks() {
  btnAddTask.addEventListener('click', function () {
    if (inputTasks.value.length > 0) {
      let newLi = document.createElement('li');
      newLi.innerHTML = inputTasks.value;

      taskList.appendChild(newLi);
      inputTasks.value = '';
    } else {
      alert('Error! Digite uma tarefa!');
    }
    saveTaskList();
  });
}
addNewTasks();
//feita com ajuda do Matheus na mentoria
function addColorGray() {
  taskList.addEventListener('click', function (event) {
    let tasks = document.querySelectorAll('#lista-tarefas li');

    for (let i = 0; i < tasks.length; i += 1) {
      if (tasks[i].style.backgroundColor === 'rgb(230, 230, 230)') {
        tasks[i].style.backgroundColor = 'white';
        tasks[i].setAttribute('id', '');
        tasks[i].style.border = 'none';
      }
    }
    event.target.style.backgroundColor = 'rgb(230, 230, 230)';
    event.target.style.borderRadius = '10px';
    event.target.setAttribute('id', 'selected');
    /*     saveTaskList();
     */
  });
}
addColorGray();
//feita com ajuda do Matheus na mentoria
function dblclick() {
  taskList.addEventListener('dblclick', function (event) {
    if (event.target.className === 'completed') {
      event.target.className = '';
    } else {
      event.target.classList.add('completed');
    }
  });
  /*   saveTaskList();
   */
}
dblclick();

function removeAllTasks() {
  let tasks = document.querySelector('#lista-tarefas');
  tasks.innerHTML = '';
  /*   saveTaskList();
   */
}
btnRemoveAllTask.addEventListener('click', removeAllTasks);

//função feita com ajudar do Matheus na mentoria
function removeCompletedTasks() {
  let tasks = document.querySelectorAll('#lista-tarefas li');

  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].className === 'completed') {
      tasks[i].remove();
    }
  }
  /*   saveTaskList();
   */
}
btnRemoveCompletedTasks.addEventListener('click', removeCompletedTasks);

function removeSelectedTasks() {
  let tasks = document.querySelectorAll('#lista-tarefas li');

  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].id === 'selected') {
      tasks[i].remove();
    }
  }
  /*   saveTaskList();
   */
}
btnRemoveSelectedTask.addEventListener('click', removeSelectedTasks);

window.onload = function () {
  loadTaskList();
};

function saveTaskList() {
  let tasks = document.querySelector('ol');
  let taskList = tasks.innerHTML;

  localStorage.setItem('list-tasks', taskList);
}

function loadTaskList() {
  let loadTasks = localStorage.getItem('list-tasks');
  taskList.innerHTML = loadTasks;
}
btnSaveTasks.addEventListener('click', saveTaskList);
//funcção feira com ajuda do Matheus na mentoria
function moveTaskUp() {
  btnMoveUp.addEventListener('click', function () {
    let tasks = document.querySelectorAll('li');

    for (let i = 0; i < tasks.length; i += 1) {
      if (tasks[i].id === 'selected' && tasks[i] !== tasks[0]) {
        tasks[i].parentNode.insertBefore(
          tasks[i],
          tasks[i].previousElementSibling
        );
      }
    }
  });
}
moveTaskUp();
function moveTaskDown() {}
{
  btnMoveDown.addEventListener('click', function () {
    let tasks = document.querySelectorAll('li');

    for (let i = 0; i < tasks.length; i += 1) {
      if (tasks[i].id === 'selected' && tasks[i] !== tasks[tasks.length - 1]) {
        tasks[i].parentNode.insertBefore(tasks[i].nextSibling, tasks[i]);
      }
    }
  });
}
moveTaskDown();
