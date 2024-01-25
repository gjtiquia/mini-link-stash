import { Button } from "@/components/ui/button";
import { Header } from "./Header";

export function MainPage() {
    return (
        <div className="h-dvh flex flex-col">
            <Header />

            <div className="flex-grow py-2">
                <DashboardView />
            </div>

            <div className="py-8">
                <AddLinkButton />
            </div>
        </div>
    );
}

function DashboardView() {
    return (
        <>
            <h3 className="font-bold text-3xl px-2 pb-4">
                Dashboard
            </h3>

            <div className="h-full grid grid-rows-2">
                <section className="px-4">
                    <h3 className="font-bold text-2xl">
                        Recent Links
                    </h3>

                    <div className="py-2 px-4">
                        <p>
                            No links yet.
                        </p>
                    </div>
                </section>

                <section className="px-4">
                    <h3 className="font-bold text-2xl">
                        Recent Tags
                    </h3>

                    <div className="py-2 px-4">
                        <p>
                            No tags yet.
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}

function AddLinkButton() {
    return <div className="flex flex-col items-center gap-2">
        <Button size={"lg"} className="text-xl px-28 py-6">
            Add Link
        </Button>
    </div>;
}