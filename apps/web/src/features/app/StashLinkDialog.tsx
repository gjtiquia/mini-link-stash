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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

                {/* <OLD_DialogForm/> */}
                <StashLinkForm />

            </DialogContent>
        </Dialog>
    )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function OLD_DialogForm() {
    return <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="link" className="text-right">
                Link
            </Label>
            <Input id="link" className="col-span-3" />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
                Name
            </Label>
            <Input id="name" className="col-span-3" />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tags" className="text-right">
                Tags
            </Label>
            <Input id="tags" className="col-span-3" />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notes" className="text-right">
                Notes
            </Label>
            <Input id="notes" className="col-span-3" />
        </div>
    </div>
}
