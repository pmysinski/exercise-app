const createError = require('http-errors');

// could use camelCase for api and translate it to underscore_case like this
const employeeBodySerializer = ({ first_name, last_name, role, first_day_at_work, team_id, manager_id }) => {
  return {
    first_name,
    last_name,
    role,
    team_id,
    manager_id,
    first_day_at_work
  };
}

const create = (services) => {
  const { employee } = services;
  return async (req, res) => {
    try {
      const { body } = req;
      await employee.create(employeeBodySerializer(body));
      res.sendStatus(201);
    } catch (e) {
      console.log('catched', e);
      if (e instanceof employee.EmployeeServiceError) {
        throw createError(400, e.message);
      } else {
        throw e;
      }
    }
  }
};

const update = (services) => {
  const { employee } = services;
  return async (req, res) => {
    try {
      const { body } = req;
      const { id } = req.params;
      await employee.update(id, employeeBodySerializer(body));
      res.sendStatus(200);
    } catch (e) {
      if (e instanceof employee.EmployeeServiceError) {
        throw createError(400, e.message);
      } else {
        throw e;
      }
    }
  }
};

module.exports = {
  create,
  update
}