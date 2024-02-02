import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute('/app/links')({
    component: Links,
})

// TODO : Should be a full blown table (ref shadcn/ui guide on how to setup tanstack table)

function Links() {
    return <p>TODO: All Links</p>
}