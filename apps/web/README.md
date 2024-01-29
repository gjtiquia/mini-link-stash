# Mini Link Stash - Web

## Comands

`npm run dev:host`: Network development environment. Mobile devices on the same internet can access the server.

`npm run build`: Start production build.

`npm run preview`: Preview production build.

## Commands - shadcd/ui

Reference: <https://ui.shadcn.com/docs/cli>

`npx shadcn-ui@latest init`: Initialize configurations and dependencies. Can run again to change configurations. Note that may need to update the components as well.

`npx shadcn-ui@latest add [component]`: Use to add components and dependencies.

## Client-side State Management Notes

Jotai vs Zustand

- Jotai is a replacement for useContext + useState, for a global store for consumption via React hooks
- Zustand is a global store but can consume outside of React
- [Official Comparison from Zustand docs](https://docs.pmnd.rs/zustand/getting-started/comparison#jotai)

## Auth Notes

TL;DR

Decided to go with `lucia`.

`next-auth` => `auth-js` docs are in a terrible state right now.

`Supabase Auth` tho you can technically self host, is still super bloated with lots of defaults and need to use their entire suite even if just using for Auth. Railway does not support docker-compose yet so cannot self host on Railway. Docs are really good tho and really easy to get started.

For web apps, `lucia` is a new solution that is gaining traction. More bare bones but more customization.  
As of now, v3 was published 2 days ago (2024-01-27)  
v2 docs have guide on React Native with Expo (https://v2.lucia-auth.com/guidebook/github-oauth-native/expo/)  
Uses bearer token instead of cookies (compared to web which uses cookies by default)  

Both `auth-js` and `lucia` uses your own database for auth. You own and manage the data, unlike `Supabase Auth`.
