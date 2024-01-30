# Mini Link Stash - Server Notes

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
- But the added complex setup... Not necessary
  - <https://stackoverflow.com/questions/77377191/how-to-set-up-docker-compose-with-monorepo-structure>
  - In one of the comments, just plain Node for local development. Containerize for deployment (if needed). Just start database container with container.

## Express Notes

- `express.json()` and `express.urlencoded()`
  - <https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded>
  - mainly for PUT and POST requests
  - used when sending data to the server, enclosed in the request body
  - `express.json()`: recognize the incoming request object as a JSON object
  - `express.urlencoded()`: recognize the incoming request object as strings or arrays

- it is possible to only apply middleware to certain routes
  - <https://stackoverflow.com/questions/35489372/expressjs-applying-middleware-only-to-routes-in-router>