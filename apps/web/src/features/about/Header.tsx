import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export function Header() {
    return (
        <div className="flex justify-between py-2">
            <LeftHeader />

            <RightHeader />
        </div>
    );
}

function LeftHeader() {
    return <button className="px-2">
        <div className="flex items-center gap-2">
            <Link to={"/"} className="font-bold">
                Mini Link Stash
            </Link>
        </div>
    </button>;
}

function RightHeader() {
    return <div className="px-3 flex items-center gap-3">
        <ModeToggle />

        <Link className="text-sm" to={"/about"}>
            About
        </Link>

        <a className="text-sm" href="https://github.com/gjtiquia/mini-link-stash" target="_blank">
            GitHub
        </a>

        <Button size={"sm"}>
            Sign In
        </Button>
    </div>;
}
