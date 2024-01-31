import { Link } from "@tanstack/react-router";
import { HeaderVariant } from "./Header";

export function LeftHeader(props: { variant: HeaderVariant; }) {

    if (props.variant === "home")
        return <div></div>;

    if (props.variant === "about")
        return <button className="px-2">
            <div className="flex items-center gap-2">
                <Link to={"/"} className="font-bold text-sm">
                    Mini Link Stash
                </Link>
            </div>
        </button>;

    return (
        <button className="px-2">
            <div className="flex items-center gap-2">
                {/* TODO: replace with hamburger icon */}
                <p className="text-sm">
                    =
                </p>
                <p className="font-bold text-sm">
                    Mini Link Stash
                </p>
            </div>
        </button>
    );
}
