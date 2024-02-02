import { DashboardPage } from "@/features/app"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute('/app/dashboard')({
    component: Dashboard,
})

function Dashboard() {
    return <DashboardPage />
}