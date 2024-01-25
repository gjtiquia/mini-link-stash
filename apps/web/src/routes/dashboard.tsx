import { createRoute, redirect } from "@tanstack/react-router"
import { DashboardPage } from "@/features/stash"
import { useAuthStore } from '@/store'
import { rootRoute } from "./__root"

export const dashboardRoute = createRoute({
    beforeLoad: () => {
        const isLoggedIn = useAuthStore.getState().isLoggedIn;
        if (!isLoggedIn) {
            throw redirect({
                to: '/',
                search: {
                    // Use the current location to power a redirect after login
                    // (Do not use `router.state.resolvedLocation` as it can
                    // potentially lag behind the actual current location)
                    redirect: location.href, // Basically passes a /?redirect=http://localhost:5173/dashboard in the url, so we know where they directed from
                },
            })
        }
    },

    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: () => <DashboardPage />,
})