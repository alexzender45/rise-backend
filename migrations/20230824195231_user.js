exports.up = function(knex) {
    return knex.schema
      .createTable('users', function(table) {
        table.increments('id').primary();
        table.string('username').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.timestamp('createdat').defaultTo(knex.fn.now());
      })
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('users');
  };
  