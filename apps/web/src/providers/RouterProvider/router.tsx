import { createRouter, createHashHistory } from '@tanstack/react-router';
import { routeTree } from '../../routeTree.gen'

/*
Support static web servers
Because there is only a single index.html
Static web servers may not have the ability to redirect (eg. /about) to index.html, then route to /about from there
(This is the case for Netlify and npx http-server)

Ref: https://stackoverflow.com/questions/77466065/using-tanstack-router-with-a-spa-in-github-pages
Ref: https://tanstack.com/router/v1/docs/guide/history-types

Note: Tried memoryHistory, basically neglects the URL completely (as if it was an electron app). So cannot directly navigate to eg. /about page via pasting into URL.
Note: Tried hashHistory works even with file-based routing! URL changes when navigating, use that for copy + pasting. Cannot directly do http://localhost:5173/about, but http://localhost:5173/#/about works!

Extra Research:

Vue Router has history types too
https://router.vuejs.org/guide/essentials/history-mode 
- it mentioned the same pitfalls that the default history type (browser history) has on single page applications
- however it gave a potential solution, to have a catch-all route. But... seems like it means cannot paste into the URL and directly navigate?

React Router has history types too
https://github.com/remix-run/react-router/blob/v3/docs/guides/Histories.md
- it mentioned for browser history, the server must be able to handle URLS that are not /, eg. /about
- it gave an example with express handling these routes
- but it also mentioned for beginners, # is sufficient, especially for servers that do not have this handling (eg. static web servers)
*/
const hashHistory = createHashHistory();

export const router = createRouter({
    routeTree,
    history: hashHistory
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}
