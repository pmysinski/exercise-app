exports.up = async function (knex) {

  await knex.schema.createTable('team', function (t) {
    t.increments().unsigned().primary();
    t.text('name').notNull();
    t.unique('name');
  });

  await knex.schema.createTable('employee', function (t) {
    t.increments().primary();
    t.text('first_name').notNull();
    t.text('last_name').notNull();

    // 
    t.timestamp('first_day_at_work');

    // could be enum orseparate table with roles 
    t.text('role').notNull();

    // everyone has to have manager? can someone be his own manager I guess not
    t.integer('manager_id').nullable();
    t.check('?? <> ??', ['id', 'manager_id'], 'employee_id_manager_id_equal_check');

    t.integer('team_id').notNull();

    t.foreign('manager_id').onDelete('SET NULL').references('employee.id');

    t.foreign('team_id').references('team.id');
    t.index('team_id', 'idx_team_id');
    t.index('manager_id', 'idx_manager_id');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable('employee');
  await knex.schema.dropTable('team');
};
