import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@/components/TanStackRouterDevTools'
import { NotFoundPage } from '@/features/NotFoundPage'

export const Route = createRootRoute({
    notFoundComponent: () => <NotFoundPage />,
    component: () => (
        <>
            <Outlet />
            {/* <TanStackRouterDevtools /> */}
        </>
    ),
})