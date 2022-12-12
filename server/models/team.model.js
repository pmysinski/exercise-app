const ModelBase = require('../utils/model-base');

const name = 'team';
const tableName = 'team';

class TeamModelError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = ({ db }) => {
  const modelbase = ModelBase({ name, tableName, db, ModelError: TeamModelError });

   // add transactions
  const create = async (data) => {
    const existTeamWithSameName = await modelbase.findOne({ name: data.name });
    if (existTeamWithSameName) {
      throw new TeamModelError(`Team with "${data.name}" name already exists`);
    }
    return await modelbase.create(data);
  }

  const update = async (id, data) => {
    const existTeamWithSameName = await modelbase.findOne({ name: data.name });
    if (existTeamWithSameName && existTeamWithSameName.id !== id) {
      throw new TeamModelError(`Team with "${data.name}" name already exists`);
    }
    await modelbase.update(id, data);
  }

  return {
    ...modelbase,
    create,
    update,
  };
}