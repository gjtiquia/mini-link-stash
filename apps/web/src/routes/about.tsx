import { AboutPage } from "@/features/about/AboutPage"
import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./__root"

export const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: () => <AboutPage />,
})