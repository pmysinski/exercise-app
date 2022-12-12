const request = require('supertest');

describe('API - teams', () => {
  afterEach(() => {
    models.team.destroy();
  });

  test('It should POST a new team', async () => {
    const response = await request(app)
      .post('/api/v1/teams')
      .send({ name: 'software' })

    const foundTeam = await models.team.findOne({ id: response.body.id });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ id: response.body.id });
    expect(foundTeam).toEqual({ id: response.body.id, name: 'software' });
  });

  test('It should PATCH a team', async () => {
    const { id } = await models.team.create({ name: 'hardware' });

    const response = await request(app)
      .patch(`/api/v1/teams/${id}`)
      .send({ name: 'hardwareupdated' });

    const foundTeam = await models.team.findOne({ id });

    expect(response.statusCode).toBe(200);
    expect(foundTeam).toEqual({ id: id, name: 'hardwareupdated' });
  });
});