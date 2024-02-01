import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    // DialogFooter,
    // DialogClose,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { StashLinkForm } from "./StashLinkForm"
import { useState } from "react";

export function StashLinkDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>
                <Button size={"lg"} className="text-xl px-28 py-6">
                    Stash Link
                </Button>
            </DialogTrigger>

            <DialogContent>

                <DialogHeader>
                    <DialogTitle>Stash New Link</DialogTitle>
                    <DialogDescription>
                        Click stash when you're done.
                    </DialogDescription>
                </DialogHeader>

                <StashLinkForm onSubmitSuccess={() => setOpen(false)} />

            </DialogContent>
        </Dialog>
    )
}

