import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { StashTagSelector } from "./StashTagSelector"
import { trpc } from "@/lib/trpc"

// Reference: https://ui.shadcn.com/docs/components/form
// Reference: https://shadcnui-expansions.typeart.cc/docs/multiple-selector#Form

const tagSchema = z.object({
    label: z.string(),
    value: z.string(),
});

const formSchema = z.object({
    link: z.string().url(),
    name: z.string(),
    tags: z.array(tagSchema),
    notes: z.string(),
})

interface StashLinkFromProps {
    onSubmitSuccess: () => void
}

export function StashLinkForm(props: StashLinkFromProps) {

    const utils = trpc.useUtils();
    const addLinkMutation = trpc.addLink.useMutation({
        onSuccess: () => {
            // utils.invalidate(); // Invalidates ALL queries
            utils.getRecentLinks.invalidate();
        }
    });

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            link: "",
            name: "",
            tags: [],
            notes: ""
        }
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)

        await addLinkMutation.mutateAsync({
            link: values.link,
            name: values.name,
            tags: values.tags.map(x => x.value),
            notes: values.notes
        })

        props.onSubmitSuccess();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Link</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                                <StashTagSelector
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="resize-none"
                                    rows={4}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {(form.watch().link.length > 0 && !addLinkMutation.isPending) &&
                    <Button type="submit" className="sm:w-fit sm:px-8 sm:self-end">Stash</Button>
                }

                {addLinkMutation.isPending &&
                    <Button disabled className="sm:w-fit sm:px-8 sm:self-end">Stashing...</Button>
                }

                {/* // TODO : Global toast for errors */}
            </form>
        </Form>
    )
}
