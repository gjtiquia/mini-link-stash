import { Link, useNavigate } from "@tanstack/react-router";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { useAuthStore } from "@/store";
import { HeaderVariant } from "./Header";
import { googleLoginURL } from "@/features/login/googleLoginURL";

export function RightHeader(props: { variant: HeaderVariant; }) {

    const isLoggedIn = useAuthStore(state => state.isLoggedIn);

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

    const logOut = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    async function logOutSequenceAsync() {
        // TODO : Log out from google
        logOut();
        navigate({ to: "/" });
    }

    return (
        <Button size={"sm"} onClick={() => logOutSequenceAsync()}>
            Log Out
        </Button>
    );
}
