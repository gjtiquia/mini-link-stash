import { Header } from "./Header";

export function LoginPage() {
    return (
        <div className="h-dvh flex flex-col">
            <Header />

            <div className="flex-grow">
                <HeroBanner />
            </div>

            <div className="py-16">
                <HeroCallToAction />
            </div>
        </div>
    );
}

function HeroBanner() {
    return <div className="h-full flex flex-col justify-center items-center gap-2">
        <h1 className="font-bold text-5xl">
            Mini Link Stash
        </h1>
        <p>
            Never lose your links again
        </p>
    </div>;
}

function HeroCallToAction() {
    return <div className="flex flex-col items-center gap-2">
        <p>
            Start stashing your links
        </p>
        <button
            className="bg-black active:bg-gray-500 text-white text-xl font-bold px-16 py-2 rounded-md"
        >
            Sign In With Google
        </button>
    </div>;
}
