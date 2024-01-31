import { Header } from "@/components/Header";

export function AboutPage() {
    return (
        <div className="h-dvh flex flex-col">
            <Header variant="about" />

            <div className="h-full flex flex-col items-center justify-center p-8">
                <StashDefinition />

                {/* <div>
                    <p>
                        Mini Link Stash is
                    </p>
                </div> */}
            </div>

        </div>
    );
}

function StashDefinition() {
    return <div className="flex flex-col gap-1">
        <p className="text-2xl">
            Stash
        </p>

        <div className="pl-2">
            <div className="flex flex-col">
                <p className="italic text-sm font-light">verb</p>
                <p className="pl-4 text-sm">Store (something) safely in a hidden or secret place.</p>
            </div>

            <div className="flex flex-col">
                <p className="italic text-sm font-light">noun</p>
                <p className="pl-4 text-sm">A store or supply of something, typically one that is kept hidden or secret.</p>
            </div>
        </div>
    </div>;
}
