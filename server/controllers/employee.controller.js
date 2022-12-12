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

const create = (models) => {
  const { employee } = models;
  return async (req, res) => {
    try {
      const { body } = req;
      const inserted = await employee.create(employeeBodySerializer(body));
      res.status(201).json(inserted);
    } catch (e) {
      if (e instanceof employee.ModelError) {
        throw createError(400, e.message);
      } else {
        throw e;
      }
    }
  }
};

const update = (models) => {
  const { employee } = models;
  return async (req, res) => {
    try {
      const { body } = req;
      const { id } = req.params;
      await employee.update(id, employeeBodySerializer(body));
      res.sendStatus(200);
    } catch (e) {
      if (e instanceof employee.ModelError) {
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