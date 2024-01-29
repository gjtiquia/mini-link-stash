# Mini Link Stash - Express Server

## TODO

- local postgres database for developing
  - <https://docs.docker.com/language/nodejs/develop/>
- setup express
- setup drizzle
- setup lucia
  - then setup client + server auth flow in dev environment
- deploy server to Railway
  - also setup Postgres service in Railway
- setup trpc
  - auth callbacks should use regular endpoints
  - only client-facing endpoints should use trpc

## Docker Notes

- setup using `docker init`, following docker guides > language-specific guides > node.js
- see [Turborepo with-docker example](https://github.com/vercel/turbo/tree/main/examples/with-docker), each app has a `Dockerfile`, with `docker-compose.yml` in the root.

## Drizzle Notes

- connection string format: "postgres://user:password@host:port/db"
- use `pg` as the driver
