import { useAuthStore } from '@/store'
import { createFileRoute, redirect } from '@tanstack/react-router'

type LoginSearch = {
    access_token: string
}

export const Route = createFileRoute('/login/')({
    validateSearch: (search: Record<string, unknown>): LoginSearch => {
        return {
            access_token: (search.access_token as string) || ''
        }
    },
    beforeLoad: ({ search }) => {
        useAuthStore.getState().setAccessToken(search.access_token);
        throw redirect({ to: '/app' })
    }
})