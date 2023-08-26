exports.up = function(knex) {
    return knex.schema
      .createTable('comments', function(table) {
        table.increments('id').primary();
        table.string('content').notNullable();
        table.integer('post_id').unsigned().references('id').inTable('posts');
        table.integer('user_id').unsigned().references('id').inTable('users')
        table.timestamp('createdat').defaultTo(knex.fn.now());
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('comments')
  };
  
