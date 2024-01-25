import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { LogInSequenceAsync } from "./LogInSequenceAsync";

export function Header() {
    return (
        <div className="flex justify-end items-center p-2 gap-3">
            <ModeToggle />

            <Link className="text-sm" to={"/about"}>
                About
            </Link>

            <a className="text-sm" href="https://github.com/gjtiquia/mini-link-stash" target="_blank">
                GitHub
            </a>

            <Button size={"sm"} onClick={() => LogInSequenceAsync()}>
                Log In
            </Button>
        </div>
    );
}
