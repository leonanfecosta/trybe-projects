const data = require('../data/zoo_data');

const { employees } = data;

function getEmployeeByName(employeeName) {
  let result = employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);

  if (!employeeName) result = {};

  return result;
}

module.exports = getEmployeeByName;
