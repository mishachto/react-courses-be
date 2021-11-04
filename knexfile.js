// Update with your config settings.

module.exports = {
    
      client: 'pg',
      connection: {
        host: "localhost",
        port: 5432,
        database: 'todosBD',
        user:     'postgres',
        password: 'solonyna22'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }

  };
  