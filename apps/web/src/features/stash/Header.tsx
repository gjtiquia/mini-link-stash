import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store";
import { useNavigate } from "@tanstack/react-router";

export function Header() {

    const logOut = useAuthStore((state) => state.logout)
    const navigate = useNavigate();

    async function logOutAsync() {
        // TODO : Log out from google

        logOut();
        navigate({ to: "/" })
    }

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

                <Button size={"sm"} onClick={() => logOutAsync()}>
                    Log Out
                </Button>
            </div>
        </div>
    );
}
