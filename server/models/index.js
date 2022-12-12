'use strict'

const createTeamModel = require('./team.model');
const createEmployeeModel = require('./employee.model');

const createModels = (db) => {
  const models = {};


  const teamModel = createTeamModel({ db, models });
  models[teamModel.name] = teamModel;
  const employeeModel = createEmployeeModel({ db, models });
  models[employeeModel.name] = employeeModel;

  return models;
}


module.exports = createModels;