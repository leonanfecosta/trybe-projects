const data = require('../data/zoo_data');

const { employees } = data;
// console.log(employees);

function isManager(id) {
  return employees.some((element) => element.managers.includes(id));
}

function getRelatedEmployees(managerId) {
  if (!isManager(managerId)) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  }
  const filterEmployees = employees
    .filter((employee) => employee.managers.includes(managerId))
    .map((obj) => `${obj.firstName} ${obj.lastName}`);
  return filterEmployees;
}

module.exports = { isManager, getRelatedEmployees };
