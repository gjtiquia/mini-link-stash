import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/lib/trpc";

export function DashboardView() {

    return (
        <>
            <h3 className="font-bold text-3xl px-2 pb-4">
                Dashboard
            </h3>

            <div className="h-full">
                <section className="px-4">
                    <h3 className="font-bold text-2xl">
                        Recent Links
                    </h3>

                    <div className="py-2 h-[40vh] w-full">
                        <RecentLinksView />
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

function RecentLinksView() {

    const getRecentLinksQuery = trpc.getRecentLinks.useQuery();

    if (getRecentLinksQuery.isPending)
        return <p className="font-thin">Loading</p>

    if (getRecentLinksQuery.isError)
        return <p className="text-red-500">Error: {getRecentLinksQuery.error.message}</p>

    return (
        <ScrollArea className="h-full rounded-md border">
            <ul className="p-2">
                {getRecentLinksQuery.data?.map((x) => (
                    <li key={x.link.id} className="break-all">
                        <div className="
                            sm:grid sm:auto-cols-fr sm:grid-flow-col
                        ">
                            <a href={x.link.url} target="_blank"
                                className="text-blue-500 hover:text-blue-600 active:text-blue-700"
                            >
                                {x.link.url}
                            </a>
                            <p>{x.link.modifiedAt}</p>
                            <div>{x.tags.map((tag) => <p>{tag.name}</p>)}</div>
                        </div>
                        <Separator className="my-2" />
                    </li>
                ))}
            </ul>
        </ScrollArea>
    )
}
