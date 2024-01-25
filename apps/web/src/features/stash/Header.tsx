import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <div className="flex justify-between py-2">
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


            <div className="px-3 flex items-center gap-3">
                <ModeToggle />

                <Button size={"sm"}>
                    Sign Out
                </Button>
            </div>
        </div>
    );
}
