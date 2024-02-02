import { protectedProcedure } from "../../lib/trpc";
import { lucia } from '../../lib/lucia';

export function logoutProcedure() {
    return protectedProcedure
        .mutation(async (opts) => {
            const { ctx } = opts;

            console.log("Server received logout mutation! Context:", ctx);
            await lucia.invalidateSession(ctx.session.id);
        });
}
