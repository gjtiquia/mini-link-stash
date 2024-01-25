import { LoginPage } from "@/features/login"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <LoginPage />
    )
}