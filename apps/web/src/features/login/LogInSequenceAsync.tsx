import { useAuthStore } from "@/store";
import { router } from "@/lib/router";

export async function LogInSequenceAsync() {
    useAuthStore.getState().login();
    router.navigate({ to: "/dashboard" });
}
