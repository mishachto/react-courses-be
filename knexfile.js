// Update with your config settings.

module.exports = {
    
      client: 'pg',
      connection: {
        // host: "localhost",
        // port: 5432,
        // database: 'todosBD',
        // user:     'postgres',
        // password: 'solonyna22'
        
        host: "ec2-54-73-110-26.eu-west-1.compute.amazonaws.com",
        database: "d3p2etlvl7e8gr",
        user:     'uhedcqwspchslt',
        password: '5f2e1d6f25813353eb468405fe1c4c1f43f4fa8d984546ee6016d6efea95b651',
        port: 5432,
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }

  };
  