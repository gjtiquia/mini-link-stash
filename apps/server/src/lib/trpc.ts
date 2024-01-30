import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

// created for each request
export const createContext = ({ req, res, }: trpcExpress.CreateExpressContextOptions) => ({
    // no context
    // TODO : Auth -> https://trpc.io/docs/server/authorization
});

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

