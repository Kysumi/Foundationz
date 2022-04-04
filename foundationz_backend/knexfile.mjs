// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
    development: {
        client: 'postgresql',
        connection: {
            database: 'foundationz',
            user: 'found',
            password: 'found'
        },
        debug: true,
        migrations: {
            directory: "./db/migrations",
            extension: 'cjs',
            loadExtensions: ['.cjs']
        },
        seeds: {
            directory: './db/seeds',
            extension: 'js',
            loadExtensions: ['.js']
        }
    },
};
