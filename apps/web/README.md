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

Zustand persist

- <https://docs.pmnd.rs/zustand/integrations/persisting-store-data>
- Can store data in localStorage
  - localStorage vs sessionStorage vs cookies
    - <https://www.loginradius.com/blog/engineering/guest-post/local-storage-vs-session-storage-vs-cookies/>
  - supabase stores token in localStorage
    - <https://www.reddit.com/r/Supabase/comments/11z7xa0/securely_store_session_using_supabase/>
    - <https://supabase.com/docs/guides/auth/server-side-rendering#how-do-i-make-the-cookies-httponly->

## Auth Notes

TL;DR

Decided to go with `lucia`.

`next-auth` => `auth-js` docs are in a terrible state right now.

`Supabase Auth` tho you can technically self host, is still super bloated with lots of defaults and need to use their entire suite even if just using for Auth. Railway does not support docker-compose yet so cannot self host on Railway. Docs are really good tho and really easy to get started.

For web apps, `lucia` is a new solution that is gaining traction. More bare bones but more customization.  
As of now, v3 was published 2 days ago (2024-01-27)  
v2 docs have guide on React Native with Expo (<https://v2.lucia-auth.com/guidebook/github-oauth-native/expo/>)  
Uses bearer token instead of cookies (compared to web which uses cookies by default)  

Both `auth-js` and `lucia` uses your own database for auth. You own and manage the data, unlike `Supabase Auth`.

## Form notes

- create/select multi combobox for tags
  - shadcn combobox is still a bit simple
  - hv some solutions here
    - https://github.com/shadcn-ui/ui/issues/927 
    - https://github.com/shadcn-ui/ui/issues/66
    - https://twitter.com/mxkaske/status/1657796540755320832?t=S9QA17I2-YmhBE43PNuWVQ&s=19 
