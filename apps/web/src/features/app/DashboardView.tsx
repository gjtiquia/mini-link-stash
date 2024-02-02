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
                {getRecentLinksQuery.data?.length > 0 ? getRecentLinksQuery.data?.map((x) => (
                    <RecentLinkElement key={x.link.id} link={{ ...x.link, modifiedAt: new Date(x.link.modifiedAt) }} tags={x.tags} />
                )) : <p>No links yet</p>}
            </ul>
        </ScrollArea>
    )
}

interface RecentLink {
    id: string,
    url: string,
    modifiedAt: Date
}

interface Tag {
    id: string,
    name: string
}

interface RecentLinkElementProps {
    link: RecentLink,
    tags: Tag[]
}

function RecentLinkElement(props: RecentLinkElementProps) {
    return (
        <li key={props.link.id}>
            <div className="
                flex flex-col gap-2
                sm:grid sm:auto-cols-fr sm:grid-flow-col sm:gap-4
            ">
                <a href={props.link.url} target="_blank"
                    className="
                        text-blue-500 hover:text-blue-600 active:text-blue-700
                        break-all line-clamp-1
                        sm:truncate sm:line-clamp-none
                    "
                >
                    {props.link.url}
                </a>

                <div className="flex gap-4">
                    <p className="hidden md:block">
                        {props.link.modifiedAt.toLocaleDateString()}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {/* //TODO: Use shadcn/ui badge instead */}
                        {props.tags.map((tag) =>
                            <p key={tag.id} className="whitespace-nowrap bg-green-500 text-secondary text-sm font-bold px-1 rounded-md h-fit">
                                {tag.name}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <Separator className="my-2" />
        </li>
    )
}
