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


            <div className="px-3">
                <button
                    className="text-sm bg-black active:bg-gray-500 text-white font-bold px-4 py-1 rounded-md"
                >
                    Sign Out
                </button>
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
        <button
            className="bg-black active:bg-gray-500 text-white text-xl font-bold px-28 py-4 rounded-md"
        >
            Add Link
        </button>
    </div>;
}