const createError = require('http-errors');

const teamBodySerializer = ({ name }) => {
  return {
    name
  };
}

const create = (services) => {
  const { team } = services;
  return async (req, res) => {
    try {
      const { body } = req;
      const inserted = await team.create(teamBodySerializer(body));
      res.status(201).json(inserted);
    } catch (e) {
      if (e instanceof team.TeamServiceError) {
        throw createError(400, e.message);
      } else {
        throw e;
      }
    }
  }
};

const update = (services) => {
  const { team } = services;
  return async (req, res) => {
    try {
      const { body } = req;
      const { id } = req.params;
      await team.update(id, teamBodySerializer(body));
      res.sendStatus(200);
    } catch (e) {
      if (e instanceof team.TeamServiceError) {
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