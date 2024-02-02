import { Header } from "@/components/Header";
import { StashLinkDialog } from "./StashLinkDialog";
import { DashboardView } from "./DashboardView";

export function DashboardPage() {

    return (
        <div className="h-dvh flex flex-col">
            <Header variant="app" />

            <div className="flex-grow py-2">
                <DashboardView />
            </div>

            <div className="py-8 flex flex-col items-center">
                <StashLinkDialog />
            </div>
        </div>
    );
}
