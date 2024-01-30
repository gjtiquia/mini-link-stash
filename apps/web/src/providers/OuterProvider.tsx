import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { trpc } from "@/lib/trpc";
import { env } from '@/env';
import { useAuthStore } from '@/store';

export function OuterProvider(props: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
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