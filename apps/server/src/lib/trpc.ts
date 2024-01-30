import { TRPCError, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { lucia } from './lucia';

// created for each request
export async function createContext({ req, res, }: trpcExpress.CreateExpressContextOptions) {

    if (!req.headers.authorization)
        return { authError: "No authorization header!" };

    const sessionId = lucia.readBearerToken(req.headers.authorization);
    if (!sessionId)
        return { authError: "Cannot read bearer token!" };

    const { session, user } = await lucia.validateSession(sessionId);
    if (!session || !user)
        return { authError: "Invalid session!" };

    return {
        user,
        session
    }
};

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async function isAuthed(opts) {
    const { ctx } = opts;

    if (!ctx.user) {
        console.log("Unauthorized user! Error:", ctx.authError);
        throw new TRPCError({ code: 'UNAUTHORIZED', message: ctx.authError });
    }

    return opts.next({
        ctx: {
            user: ctx.user,
            session: ctx.session
        }
    });
});

