import { RightHeader } from "./RightHeader";
import { LeftHeader } from "./LeftHeader";

export type HeaderVariant = "home" | "about" | "app"

export function Header(props: { variant: HeaderVariant }) {

    return (
        <div className="flex justify-between py-2">
            <LeftHeader {...props} />
            <RightHeader {...props} />
        </div>
    );
}
