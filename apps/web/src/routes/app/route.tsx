import { useAuthStore } from '@/store';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/app')({
    beforeLoad: (opts) => {
        console.log("/app beforeLoad")

        const isLoggedIn = useAuthStore.getState().isLoggedIn();
        if (!isLoggedIn)
            throw redirect({ to: '/' })

        console.log(opts)

        // redirect ONLY IF on the parent route! Or else infinite loop when parent beforeLoad is called in children
        if (opts.location.pathname === "/app")
            throw redirect({ to: '/app/dashboard' })
    },
})