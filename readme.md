# Install requirements:
 - docker (https://docs.docker.com/get-docker/)
 - node >19

# Developing

## Start developing cmd:

### With local database
`docker compose --env-file .env up`

Or

 `docker compose --env-file .env up -d ` for detached

### with remote db

Change `.env` file with proper values for DB connection

### Developing code
Make sure you have database setup then

`npm run dev`

## Migrations

### Create migration

`npx knex migrate:make migration_name`

### run all migrations

`npx knex migrate:latest`

### rollback last migration

`npx knex migrate:rollback`

# testing

## run tests



## In case of changing dependncies use:


# production
