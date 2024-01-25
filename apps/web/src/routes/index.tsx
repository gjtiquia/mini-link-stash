import { LoginPage } from "@/features/login"
import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./__root"

export const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <LoginPage />,
})