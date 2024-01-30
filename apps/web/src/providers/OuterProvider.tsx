import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { trpc } from "@/lib/trpc";
import { env } from '@/env';
import { useAuthStore } from '@/store';

export function OuterProvider(props: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        queryCache: new QueryCache({
            // replacement of onError per query in React Query v4. Global handling instead.
            // https://tkdodo.eu/blog/react-query-error-handling#the-global-callbacks
            // https://tkdodo.eu/blog/breaking-react-querys-api-on-purpose#defining-on-demand-messages
            onError: (error, query) => {
                console.error("QueryCache: Something went wrong:", error, query, query.meta)
                console.error()
            }
        }),
    }));

    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: env.VITE_API_URL + "/app",

                    // You can pass any HTTP headers you wish here
                    async headers() {
                        return {
                            authorization: "Bearer " + useAuthStore.getState().access_token,
                        };
                    },
                }),
            ],
        }),
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {props.children}
            </QueryClientProvider>
        </trpc.Provider>
    );
}