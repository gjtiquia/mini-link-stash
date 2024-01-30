import { Link, useNavigate } from "@tanstack/react-router";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { useAuthStore } from "@/store";
import { HeaderVariant } from "./Header";
import { googleLoginURL } from "@/features/home/googleLoginURL";
import { trpc } from "@/lib/trpc";

export function RightHeader(props: { variant: HeaderVariant; }) {

    const isLoggedIn = useAuthStore(state => state.isLoggedIn());

    return <div className="px-3 flex items-center gap-3">
        <DarkModeToggle />

        {props.variant !== "app" &&
            <>
                <Link className="text-sm [&.active]:font-bold" to={"/about"}>
                    About
                </Link>

                <a className="text-sm" href="https://github.com/gjtiquia/mini-link-stash" target="_blank">
                    GitHub
                </a>
            </>
        }

        {isLoggedIn ? <LogOutButton /> : <LogInButton />}
    </div>;
}

function LogInButton() {
    return (
        <a
            className={buttonVariants({ size: "sm" })}
            href={googleLoginURL}
        >
            Log In
        </a>
    );
}

function LogOutButton() {

    const discardAccessToken = useAuthStore((state) => state.discardAccessToken);
    const navigate = useNavigate();

    const logOutMutation = trpc.logout.useMutation({
        onSettled: () => {
            discardAccessToken();
            navigate({ to: "/" });
        },
    })

    return (
        <Button size={"sm"} onClick={() => logOutMutation.mutate()}>
            Log Out
        </Button>
    );
}
