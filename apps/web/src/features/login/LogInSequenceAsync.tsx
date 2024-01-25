import { useAuthStore } from "@/store";
import { router } from "@/providers/RouterProvider/router";

export async function loginSequenceAsync() {
    useAuthStore.getState().login();
    router.navigate({ to: "/dashboard" });
}
