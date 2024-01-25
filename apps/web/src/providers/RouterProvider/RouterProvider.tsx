import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'

export function TanStackRouterProvider() {
    return <RouterProvider router={router} />
}
