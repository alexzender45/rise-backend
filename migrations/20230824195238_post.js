exports.up = function(knex) {
    return knex.schema
      .createTable('posts', function(table) {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.integer('user_id').unsigned().references('id').inTable('users');
        table.timestamp('createdat').defaultTo(knex.fn.now());
      })
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('posts')
  };
  