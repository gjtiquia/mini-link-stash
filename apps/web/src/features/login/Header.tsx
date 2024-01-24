import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <div className="flex justify-end items-center p-3 gap-3">
            <ModeToggle />

            <p className="text-sm">
                About
            </p>

            <p className="text-sm">
                GitHub
            </p>

            <Button size={"sm"}>
                Sign In
            </Button>
        </div>
    );
}
