const logger = require('../utils/logger')(__filename);




module.exports = (models) => {
  const { team } = models;

  const create = async (data) => {
    try {
      await team.create(data);
    } catch (e) {
      logger.error(e);
    }
  }

  const update = async (id, data) => {
    try {
      await team.update(id, data);
    } catch (e) {
      logger.error(e);
    }
  }

  return {
    create,
    update
  }
}