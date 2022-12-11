const express = require('express');
const employee = require('./employee.routes');
const team = require('./team.routes');

module.exports = (serverContext) => {
  const router = express.Router();
  router.use('/emloyees', employee(serverContext));
  router.use('/teams', team(serverContext));

  return router;
};
