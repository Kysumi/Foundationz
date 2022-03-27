// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: 'postgresql',
    connection: {
      database: 'foundationz',
      user:     'found',
      password: 'found'
    },
    debug: true,
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: './db/seeds',
    }
  },
};
