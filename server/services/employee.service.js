class EmployeeServiceError extends Error {
  constructor(message) {
    super(message);
  }
}


module.exports = (models) => {
  const { employee, team } = models;

  const validate = async (data) => {
    const teamExists = await team.findOne({ id: data.team_id });
    if (!teamExists) {
      throw new EmployeeServiceError(`Team with "${data.team_id}" does not exists`);
    }
    if (data.manager_id !== undefined) {
      const managerExists = await employee.findOne({ id: data.manager_id });
      if (!managerExists) {
        throw new EmployeeServiceError(`Manager with "${data.manager_id}" does not exists`);
      }
    }
  }


  const create = async (data) => {
    await validate(data);
    return await employee.create(data);
  }

  const update = async (id, data) => {
    await validate(data);
    await employee.update(id, data);
  }

  return {
    create,
    update,
    EmployeeServiceError
  }
}