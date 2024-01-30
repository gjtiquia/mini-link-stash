import { ThemeProvider, TanStackRouterProvider, OuterProvider } from "@/providers"

export default App

function App() {
  return (
    <OuterProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TanStackRouterProvider />
      </ThemeProvider>
    </OuterProvider>
  )
}
