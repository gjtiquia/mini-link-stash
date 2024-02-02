import { useAuthStore } from '@/store';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    beforeLoad: () => {
        const isLoggedIn = useAuthStore.getState().isLoggedIn();
        if (isLoggedIn)
            throw redirect({ to: '/app' })
    }
})