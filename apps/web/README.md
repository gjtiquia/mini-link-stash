# Mini Link Stash - Web

## Comands

`npm run dev:host`: Network development environment. Mobile devices on the same internet can access the server.

`npm run build`: Start production build.

`npm run preview`: Preview production build.

## Commands - shadcd/ui

Reference: <https://ui.shadcn.com/docs/cli>

`npx shadcn-ui@latest init`: Initialize configurations and dependencies. Can run again to change configurations. Note that may need to update the components as well.

`npx shadcn-ui@latest add [component]`: Use to add components and dependencies.

## Notes

Jotai vs Zustand

- Jotai is a replacement for useContext, for a global store for consumption via React hooks
- Zustand is a global store but can consume outside of React
- [Official Comparison from Zustand docs](https://docs.pmnd.rs/zustand/getting-started/comparison#jotai)
