
exports.up = async function (knex) {

  await knex.schema.createTable('team', function (t) {
    t.increments().unsigned().primary();
    t.text('name').notNull();
  });

  await knex.schema.createTable('employee', function (t) {
    t.increments().primary();
    t.text('first_name').notNull();
    t.text('last_name').notNull();
    t.timestamp('first_day_at_work');
    t.text('role').notNull();

    t.integer('manager_id').nullable();
    t.integer('team_id').notNull();

    t.foreign('manager_id').onDelete('SET NULL').references('employee.id');
    t.foreign('team_id').references('team.id');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable('employee');
  await knex.schema.dropTable('team');

};
