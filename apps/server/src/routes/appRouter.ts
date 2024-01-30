import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext, protectedProcedure, router } from "../lib/trpc";
import { lucia } from '../lib/lucia';

const trpcAppRouter = router({
    greeting: protectedProcedure
        .query((opts) => {
            const { ctx } = opts;

            console.log("Server received greeting query! Context:", ctx)
            return { message: "hello world!" };
        }),

    logout: protectedProcedure
        .mutation(async (opts) => {
            const { ctx } = opts

            console.log("Server received logout mutation! Context:", ctx)
            await lucia.invalidateSession(ctx.session.id);
        })
});

// export type definition of API
export type AppRouter = typeof trpcAppRouter;

export const appRouter = trpcExpress.createExpressMiddleware({
    router: trpcAppRouter,
    createContext,
})