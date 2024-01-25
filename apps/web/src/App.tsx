import { ThemeProvider, TanStackRouterProvider } from "@/providers"

export default App

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TanStackRouterProvider />
    </ThemeProvider>
  )
}
