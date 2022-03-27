# Foundationz

## Start postgres

`docker-compose up`

## Creating a migration

`npx knex --knexfile knexfile.mjs migrate:make {migration_name_here_without_the_braces}`

## Run all migrations

`npx knex --knexfile knexfile.mjs migrate:latest`

## Creating a seeder

`npx knex --knexfile knexfile.mjs seed:make {seeder_name_here_without_the_braces} --env development`

## Adding alising paths in tsconfig

`"paths": { "@orm/*" : ["src/modules/orm/*"] },`



npx knex  --knexfile knexfile.mjs seed:run
