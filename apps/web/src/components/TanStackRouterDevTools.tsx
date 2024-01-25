import { TanStackRouterDevtools as Devtools } from '@tanstack/router-devtools';

// Reference : https://tanstack.com/router/v1/docs/devtools#only-importing-and-using-devtools-in-development

/* Not using the recommended lazy loading due to some errors encountered related to Error Boundaries?
export const TanStackRouterDevtools =
    process.env.NODE_ENV === 'production'
        ? () => null // Render nothing in production
        : React.lazy(() =>
            // Lazy load in development
            import('@tanstack/router-devtools').then((res) => ({
                default: res.TanStackRouterDevtools,
                // For Embedded Mode
                // default: res.TanStackRouterDevtoolsPanel
            })),
        )
*/

export function TanStackRouterDevtools() {
    if (process.env.NODE_ENV === 'production')
        return null;

    return <Devtools />
}