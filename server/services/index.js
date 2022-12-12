'use strict'

const teamService = require('./team.service');
const employeeService = require('./employee.service');

const createServices = (models) => {

 const team = teamService(models);
 const employee = employeeService(models);

 return {
  team,
  employee
 }
}


module.exports = createServices;