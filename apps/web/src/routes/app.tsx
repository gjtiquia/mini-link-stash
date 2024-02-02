import { useAuthStore } from '@/store';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/app')({
    beforeLoad: (opts) => {
        console.log("/app beforeLoad, location", opts.location)

        // const isLoggedIn = useAuthStore.getState().isLoggedIn();
        // if (!isLoggedIn)
        //     throw redirect({ to: '/' })

        // throw redirect({ to: '/app/dashboard' })
    },
})