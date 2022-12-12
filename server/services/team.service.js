class TeamServiceError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = (models) => {
  const { team } = models;

  const create = async (data) => {
    const existTeamWithSameName = await team.findOne({ name: data.name });
    if (existTeamWithSameName) {
      throw new TeamServiceError(`Team with "${data.name}" name already exists`);
    }
    await team.create(data);
  }

  const update = async (id, data) => {
    const existTeamWithSameName = await team.findOne({ name: data.name });
    if (existTeamWithSameName && existTeamWithSameName.id !== id) {
      throw new TeamServiceError(`Team with "${data.name}" name already exists`);
    }
    await team.update(id, data);
  }

  return {
    create,
    update,
    TeamServiceError
  }
}