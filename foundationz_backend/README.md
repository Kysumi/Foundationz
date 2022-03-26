# Foundationz

## Start postgres

`docker-compose up`

## Creating a migration

`npx knex --esm --knexfile knexfile.cjs migrate:make {migration_name_here_without_the_braces}`

## Run all migrations

`npx knex --esm --knexfile knexfile.cjs migrate:latest`

## Creating a seeder

`npx knex --esm --knexfile knexfile.cjs seed:make addUsers --env development`

## Adding alising paths in tsconfig

`"paths": { "@orm/*" : ["src/modules/orm/*"] },`
