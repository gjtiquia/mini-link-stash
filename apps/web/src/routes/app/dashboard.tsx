import { useAuthStore } from '@/store'
import { createFileRoute, redirect } from '@tanstack/react-router'

// Reference: https://tanstack.com/router/v1/docs/guide/authenticated-routes

export const Route = createFileRoute('/app/dashboard')({
    beforeLoad: () => {
        const isLoggedIn = useAuthStore.getState().isLoggedIn();
        if (!isLoggedIn)
            throw redirect({ to: '/' })
    }
})