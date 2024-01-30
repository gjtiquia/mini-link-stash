# Mini Link Stash

## NPM Commands

`npm install`: Install required packages

`npm run dev:web`: Start `/apps/web` development environment

## Docker Commands

`docker compose up --build`: Start Local Postgres Server. Remember to create `/secrets` (see `/secrets.example`).

## Docker Notes

`docker compose up --build` vs `docker compose up`

- <https://stackoverflow.com/questions/39988844/docker-compose-up-vs-docker-compose-up-build-vs-docker-compose-build-no-cach>
- The latter builds if no image found, the former builds image even when not needed.

NodeJS + Postgres Dev Guide

- <https://docs.docker.com/language/nodejs/develop/>
- uses `pg`

Official Postgres Docker Guide

- <https://www.docker.com/blog/how-to-use-the-postgres-docker-official-image/>

`expose` vs `port` in docker compose

- <https://ioflood.com/blog/docker-compose-ports-vs-expose-explained/>
- `expose` is for use between containers. An internal network that cannot be accessed from the outside.
- `port` is for bridging between internal network to external. Therefore a mapping is needed. Anyone who can access external host can access internal containers.

TODO

- google sign in + auth
- access token + express server + postgres
  - set up local dev environment with docker
- about wireframe
- main page wireframge
  - Create link
  - Read link
    - tan stack table?
  - Update link
  - Delete link
- desktop responsive design (larger fonts)
- themes
