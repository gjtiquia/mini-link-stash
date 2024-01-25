import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { loginSequenceAsync } from "@/features/login";
import { useAuthStore } from "@/store";
import { Link, useNavigate } from "@tanstack/react-router";

type HeaderVariant = "home" | "about" | "app"

export function Header(props: { variant: HeaderVariant }) {

    return (
        <div className="flex justify-between py-2">
            <LeftHeader {...props} />
            <RightHeader {...props} />
        </div>
    );
}

function LeftHeader(props: { variant: HeaderVariant }) {

    if (props.variant === "home")
        return <div></div>;

    if (props.variant === "about")
        return <button className="px-2">
            <div className="flex items-center gap-2">
                <Link to={"/"} className="font-bold">
                    Mini Link Stash
                </Link>
            </div>
        </button>;

    return (
        <button className="px-2">
            <div className="flex items-center gap-2">
                {/* TODO: replace with hamburger icon */}
                <p>
                    =
                </p>
                <p className="font-bold">
                    Mini Link Stash
                </p>
            </div>
        </button>
    )
}

function RightHeader(props: { variant: HeaderVariant }) {

    const isLoggedIn = useAuthStore(state => state.isLoggedIn);

    return <div className="px-3 flex items-center gap-3">
        <ModeToggle />

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
    )
}

function LogOutButton() {

    const logOut = useAuthStore((state) => state.logout)
    const navigate = useNavigate();

    async function logOutSequenceAsync() {
        // TODO : Log out from google

        logOut();
        navigate({ to: "/" })
    }

    return (
        <Button size={"sm"} onClick={() => logOutSequenceAsync()}>
            Log Out
        </Button>
    )
}