import { RouterProvider } from '@tanstack/react-router'
import { router } from '../lib/router'

export const TanStackRouterProvider = () => (<RouterProvider router={router} />)