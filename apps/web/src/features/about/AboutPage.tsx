import { Header } from "@/components/Header";
import { buttonVariants } from "@/components/ui/button";
import { googleLoginURL } from "../home/googleLoginURL";

export function AboutPage() {
    return (
        <div className="h-dvh flex flex-col">
            <Header variant="about" />

            <div className="h-full max-w-prose self-center flex flex-col sm:justify-center p-8 gap-8">
                <StashDefinition />

                <div className="flex-grow sm:flex-grow-0"></div>

                <div className="flex flex-col gap-4">
                    <section>
                        <p>
                            <span className="block sm:inline font-bold text-3xl">Mini Link Stash </span>
                            is a minimalistic link manager.
                        </p>
                    </section>

                    <section>
                        <p>Stash a link.</p>
                        <p>Add a name, tag, and description if you like.</p>
                        <p>Done. Quick and easy.</p>
                    </section>
                </div>

                <div className="flex-grow sm:flex-grow-0"></div>


                <section className="flex flex-col gap-2 sm:gap-4">
                    <p className="text-center">Never lose your links again.</p>
                    <a
                        className={buttonVariants({ size: "lg", className: "text-xl px-20" })}
                        href={googleLoginURL}
                    >
                        Start Stashing Your Links
                    </a>
                </section>
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
