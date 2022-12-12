const logger = require('../utils/logger')(__filename);

module.exports = (models) => {
  const { employee } = models;

  const create = async (data) => {
    try {
      await employee.create(data);
    } catch (e) {
      logger.error(e);
    }
  }

  const update = async (id, data) => {
    try {
      await employee.update(id, data);
    } catch (e) {
      logger.error(e);
    }
  }

  return {
    create,
    update
  }
}