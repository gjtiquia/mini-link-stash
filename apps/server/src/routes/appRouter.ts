import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext, router } from "../lib/trpc";
import {
    logoutProcedure,
    addLinkProcedure
} from '../controllers/appController';

const trpcAppRouter = router({
    logout: logoutProcedure(),
    addLink: addLinkProcedure()
});

// export type definition of API
export type AppRouter = typeof trpcAppRouter;

export const appRouter = trpcExpress.createExpressMiddleware({
    router: trpcAppRouter,
    createContext,
})


