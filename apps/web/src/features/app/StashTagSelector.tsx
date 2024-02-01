import MultipleSelector, { Option } from "@/components/ui/multiple-selector";

const OPTIONS: Option[] = [
    { label: 'nextjs', value: 'nextjs' },
    { label: 'React', value: 'react' },
    { label: 'Remix', value: 'remix' },
    { label: 'Vite', value: 'vite' },
    { label: 'Nuxt', value: 'nuxt' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Angular', value: 'angular' },
    { label: 'Ember', value: 'ember' },
    { label: 'Gatsby', value: 'gatsby' },
    { label: 'Astro', value: 'astro' },
];

interface StashTagSelectorProps {
    value?: Option[],
    onChange?: ((options: Option[]) => void),
}

export function StashTagSelector(props: StashTagSelectorProps) {
    return (
        <MultipleSelector
            value={props.value}
            onChange={props.onChange}
            defaultOptions={OPTIONS}
            creatable />
    );
}
