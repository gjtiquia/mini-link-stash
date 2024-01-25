import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@/components/TanStackRouterDevTools'

export const Route = createRootRoute({
    component: () => (
        <>
            <Outlet />
            <TanStackRouterDevtools />
        </>
    ),
})