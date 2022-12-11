exports.seed = async function (knex) {
  await knex('employee').del();
  await knex('team').del();

  await knex('team').insert([
    { name: 'hardware' },
    { name: 'software' },
    { name: 'managers' },
  ]);

  const teams = await knex.select().from('team');
  const getTeamByName = (name) => teams.find((t) => t.name === name);


  await knex('employee').insert([
    {
      first_name: 'Jon',
      last_name: 'Doe',
      role: 'manager',
      first_day_at_work: new Date(),
      team_id: getTeamByName('managers').id
    }
  ]);

  const managers = await knex.select().from('employee');

  await knex('employee').insert([
    {
      first_name: 'Andre',
      last_name: 'Smith',
      role: 'developer',
      team_id: getTeamByName('software').id,
      first_day_at_work: new Date(),
      manager_id: managers[0].id
    },
    {
      first_name: 'Kate',
      last_name: 'Milan',
      role: 'developer',
      first_day_at_work: new Date(),
      team_id: getTeamByName('hardware').id,
      manager_id: managers[0].id
    }
  ]);
};
