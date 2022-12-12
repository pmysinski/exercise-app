const ModelBase = require('../utils/model-base');

const name = 'employee';
const tableName = 'employee';


class EmployeeModelError extends Error {
  constructor(message) {
    super(message);
  }
}


module.exports = ({ db, models }) => {
  const modelbase = ModelBase({ name, tableName, db, ModelError: EmployeeModelError });
  const { team } = models;

  const validate = async (data) => {
    const teamExists = await team.findOne({ id: data.team_id });
    if (!teamExists) {
      throw new EmployeeModelError(`Team with "${data.team_id}" does not exists`);
    }
    if (data.manager_id !== undefined) {
      const managerExists = await modelbase.findOne({ id: data.manager_id });
      if (!managerExists) {
        throw new EmployeeModelError(`Manager with "${data.manager_id}" does not exists`);
      }
    }
  }

  const create = async (data) => {
    await validate(data);
    return await modelbase.create(data);
  }

  const update = async (id, data) => {
    await validate(data);
    await modelbase.update(id, data);
  }

  return {
    ...modelbase,
    create,
    update
  };
}