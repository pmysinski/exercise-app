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

`npm run db:migrate`

### rollback last migration

`npx knex migrate:rollback`

# testing

## run unit tests

`npm run test:unit`

## run unit tests

`npm run test:integration`

# production

Building the docker image:

`docker build . --tag exercise-app`

testing docker image locally

`docker run -p 3000:3000 --env-file .env --net=host exercise-app`
