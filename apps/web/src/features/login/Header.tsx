import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <div className="flex justify-end items-center p-3 gap-3">
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
