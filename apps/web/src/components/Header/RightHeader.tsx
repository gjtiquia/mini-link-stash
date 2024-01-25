import { Link, useNavigate } from "@tanstack/react-router";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { Button } from "@/components/ui/button";
import { loginSequenceAsync } from "@/features/login";
import { useAuthStore } from "@/store";
import { HeaderVariant } from "./Header";

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
        <Button size={"sm"} onClick={() => loginSequenceAsync()}>
            Log In
        </Button>
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
