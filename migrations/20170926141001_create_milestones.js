
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('milestones', (table) => {
      table.increments('id').primary();
      table.string('description');
      table.date('date_achieved');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('milestones')
  ])
};