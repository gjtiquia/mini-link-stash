import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    // DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { StashLinkForm } from "./StashLinkForm"

export function StashLinkDialog() {
    return (
        <Dialog>
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

                <StashLinkForm />

            </DialogContent>
        </Dialog>
    )
}

