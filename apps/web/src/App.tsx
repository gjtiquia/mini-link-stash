import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
export default App

function App() {
  return (
    <RouterProvider router={router} />
  )
}

/* Temporarily commented while setting up TanStack Router

import { MainPage } from "@/features/stash";
import { LoginPage } from "@/features/login";
import { ThemeProvider } from "@/components/theme-provider"

export default App

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <InnerApp />
    </ThemeProvider>
  )
}

function InnerApp() {
  return (
    <LoginPage />
  )
}

function InnerApp() {
  return (
    <MainPage />
  )
}

*/
