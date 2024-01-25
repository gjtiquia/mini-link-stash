import { DashboardPage } from "@/features/stash"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute('/dashboard')({
    component: Dashboard,
})

function Dashboard() {
    return <DashboardPage />
}