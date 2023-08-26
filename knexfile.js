// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
  module.exports = {
    development: {
      client: 'pg',  // <-- make sure this line exists
      connection: {
        host : '',
        database: '',
        user:     '',
        password: ''
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: './migrations'
      }
    }

};
