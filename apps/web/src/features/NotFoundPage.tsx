import { buttonVariants } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export function NotFoundPage() {
    return (
        <div className="h-dvh min-h-svh flex flex-col items-center justify-center gap-8">
            <h1 className="font-bold text-4xl">
                Page Not Found
            </h1>

            <Link
                to="/"
                className={buttonVariants({ variant: "default", size: "lg", className: "text-lg" })}
            >
                Return Home
            </Link>
        </div>
    )
}