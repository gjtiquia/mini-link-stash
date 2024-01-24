// import { MainPage } from "@/features/stash";
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

// function InnerApp() {
//   return (
//     <MainPage />
//   )
// }

