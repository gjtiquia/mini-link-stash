import { useAuthStore } from "@/store";
import { router } from "@/providers/RouterProvider/router";

export async function tryLoginSequenceAsync() {
    useAuthStore.getState().login();
    router.navigate({ to: "/dashboard" });
}
