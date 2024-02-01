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

- can't send tokens on remote redirect
  - <https://github.com/expressjs/express/issues/3551>
  - basically the redirect only includes url in header
  - cookies are only accessible from the same domain
  - that begs the question... how does supabase do it?
    - UPDATE: supabase sends the access token via params! Then stores in local storage (not cookies), then quickly resets the url
    - supposingly unsecure but... it works lmaooo~

## trpc Notes

- Setup
  - <https://trpc.io/docs/server/adapters/express>

## Database Notes

- Database schema for tags
  - each link can have many tags, each tag has many links => many-to-many relationship
  - typically use three tables for a many-to-many relationship, with a middle table used as a "junction" table
  - junction table cons: slower inserts and deletes; pros:
    - <https://stackoverflow.com/questions/20856/recommended-sql-database-design-for-tags-or-tagging>
    - <http://howto.philippkeller.com/2005/04/24/Tags-Database-schemas/> (Great comparison of different schemas)
    - <https://stackoverflow.com/questions/20856/recommended-sql-database-design-for-tags-or-tagging> (Performance comparison)
  - tag architecture reference
    - <https://justpaste.it/b26kl>

- Turso
  - SQLite but scaled to millions
    - <https://turso.tech/>
  - one database per user
    - <https://blog.turso.tech/databases-have-traditionally-been-expensive.-what-if-we-could-change-that-ec7f32ab>
    - <https://world.hey.com/dhh/multi-tenancy-is-what-s-hard-about-scaling-web-services-dd1e0e81>
    - <https://blog.turso.tech/give-each-of-your-users-their-own-sqlite-database-b74445f4>
  - seems... feasible? especially since, each user's data is pretty much isolated🤔
  - need more research
  - but the pricing for hosting... hmm
    - dont seem to have a self host documentaion
    - simple postgres on railway with pay-as-you-go is quite hard to beat
