# Mini Link Stash

## NPM Commands

`npm install`: Install required packages

`npm run dev:web`: Start `/apps/web` development environment

## Docker Commands

`docker compose up --build`: Start Local Postgres Server

TODO

- tanstack router hash routing
  - cuz served as a static site, no server capabilities to auto-route
  - can reproduce by serving `/dist` build with `npx http-server`, directly going to the `/about` url, will return 404 (Not Found)
  - broken in production as well
  - <https://stackoverflow.com/questions/77466065/using-tanstack-router-with-a-spa-in-github-pages>
- about wireframe
- main page wireframge
  - Create link
  - Read link
    - tan stack table?
  - Update link
  - Delete link
- desktop responsive design (larger fonts)
- themes
- light/dark mode toggle
- google sign in + supabase auth
- access token + express server + postgres
  - set up local dev environment with docker
