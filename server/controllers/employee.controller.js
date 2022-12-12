
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
      res.sendStatus(500);
    }
  }
};

const update = (services) => {
  const { employee } = services;
  return async (req, res) => {
  //  try {
      const { body } = req;
      const { id } = req.params;
      await employee.update(id, employeeBodySerializer(body));
      throw new Error('')
     // res.sendStatus(200);
   // } catch (e) {
      res.sendStatus(500);
   // }
  }
};

module.exports = {
  create,
  update
}