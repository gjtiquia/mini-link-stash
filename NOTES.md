# Mini Link Stash - Notes

TODO

- main page wireframge
  - Create link
    - modal?
  - Read link
    - tan stack table?
  - Update link
  - Delete link

- lol make sure users cant see each others stuff
  - row level security?

- desktop responsive design (larger fonts)

- view link features
  - as we dont have folders and just tags... need to find an easy way to isolate tags
    - similar to mixing, can have "MUTE" or "SOLO" => filter "includes" or "does not include".
    - cuz like in my case, a particular list of links might be related to a single project i'm doing, and i may want to look at all the links for that particular project

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
