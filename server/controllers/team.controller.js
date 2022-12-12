
const teamBodySerializer = ({ name }) => {
  return {
    name
  };
}

const create = (services) => {
  const { team } = services;
  return async (req, res) => {
    const { body } = req;
    await team.create(teamBodySerializer(body));
    res.sendStatus(201);
  }
};

const update = (services) => {
  const { team } = services;
  return async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    await team.update(id, teamBodySerializer(body));
    res.sendStatus(200);
  }
};

module.exports = {
  create,
  update
}