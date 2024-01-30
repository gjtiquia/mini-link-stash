import { buttonVariants } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { googleLoginURL } from "./googleLoginURL";

export function LoginPage() {

    return (
        <div className="h-dvh flex flex-col">
            <Header variant="home" />

            <div className="flex-grow">
                <HeroBanner />
            </div>

            <div className="py-16">
                <HeroCallToAction />
            </div>
        </div>
    );
}

function HeroBanner() {
    return <div className="h-full flex flex-col justify-center items-center gap-2">
        <h1 className="font-bold text-5xl">
            Mini Link Stash
        </h1>
        <p>
            Never lose your links again
        </p>
    </div>;
}

function HeroCallToAction() {

    // Login Reference: https://github.com/lucia-auth/examples/blob/main/nextjs-pages/github-oauth/pages/login.tsx

    return (
        <div className="flex flex-col items-center gap-2">
            <p>
                Start stashing your links
            </p>

            <a
                className={buttonVariants({ size: "lg", className: "text-xl px-20" })}
                href={googleLoginURL}
            >
                Log In With Google
            </a>

        </div>
    );
}