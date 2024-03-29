// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginRouteImport } from './routes/login/route'
import { Route as AppRouteImport } from './routes/app/route'
import { Route as RouteImport } from './routes/route'

// Create Virtual Routes

const AboutIndexLazyImport = createFileRoute('/about/')()
const AppLinksRouteLazyImport = createFileRoute('/app/links')()
const AppDashboardRouteLazyImport = createFileRoute('/app/dashboard')()

// Create/Update Routes

const LoginRouteRoute = LoginRouteImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AppRouteRoute = AppRouteImport.update({
  path: '/app',
  getParentRoute: () => rootRoute,
} as any)

const RouteRoute = RouteImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/route.lazy').then((d) => d.Route))

const AboutIndexLazyRoute = AboutIndexLazyImport.update({
  path: '/about/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about/index.lazy').then((d) => d.Route))

const AppLinksRouteLazyRoute = AppLinksRouteLazyImport.update({
  path: '/links',
  getParentRoute: () => AppRouteRoute,
} as any).lazy(() =>
  import('./routes/app/links/route.lazy').then((d) => d.Route),
)

const AppDashboardRouteLazyRoute = AppDashboardRouteLazyImport.update({
  path: '/dashboard',
  getParentRoute: () => AppRouteRoute,
} as any).lazy(() =>
  import('./routes/app/dashboard/route.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof RouteImport
      parentRoute: typeof rootRoute
    }
    '/app': {
      preLoaderRoute: typeof AppRouteImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      preLoaderRoute: typeof LoginRouteImport
      parentRoute: typeof rootRoute
    }
    '/app/dashboard': {
      preLoaderRoute: typeof AppDashboardRouteLazyImport
      parentRoute: typeof AppRouteImport
    }
    '/app/links': {
      preLoaderRoute: typeof AppLinksRouteLazyImport
      parentRoute: typeof AppRouteImport
    }
    '/about/': {
      preLoaderRoute: typeof AboutIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  RouteRoute,
  AppRouteRoute.addChildren([
    AppDashboardRouteLazyRoute,
    AppLinksRouteLazyRoute,
  ]),
  LoginRouteRoute,
  AboutIndexLazyRoute,
])
