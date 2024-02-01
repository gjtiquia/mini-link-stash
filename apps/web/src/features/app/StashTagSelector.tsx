import MultipleSelector, { Option } from "@/components/ui/multiple-selector";

const OPTIONS: Option[] = [
    { label: 'Tag 1', value: 'tag-1' },
    { label: 'Tag 2', value: 'tag-2' },
    { label: 'Tag 3', value: 'tag-3' },
    { label: 'Tag 4', value: 'tag-4' },
];

interface StashTagSelectorProps {
    value?: Option[],
    onChange?: ((options: Option[]) => void),
}

export function StashTagSelector(props: StashTagSelectorProps) {

    // TODO : Should search once and get all the tags with react query
    // TODO : Query before opening the dialog, fetch all the current available tags
    // TODO : Probably fetch up in dashboard and pass it down as props...? Cuz need to fetch other stuff too anyways

    // TODO : Handle edge case when entering multiple tags of the same name ...
    // TODO : Probably submit a pull request too if fixed

    return (
        <MultipleSelector
            value={props.value}
            onChange={props.onChange}
            defaultOptions={OPTIONS}
            creatable />
    );
}
