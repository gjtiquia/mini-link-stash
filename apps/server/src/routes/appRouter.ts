import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext, protectedProcedure, router } from "../lib/trpc";
import { lucia } from '../lib/lucia';
import { z } from 'zod';
import { db, links, tagMaps, tags, users } from '../lib/drizzle';
import { generateId } from 'lucia';
import { and, eq } from 'drizzle-orm';

const trpcAppRouter = router({
    greeting: protectedProcedure
        .query((opts) => {
            const { ctx } = opts;

            console.log("Server received greeting query! Context:", ctx);
            return { message: "hello world!" };
        }),

    logout: protectedProcedure
        .mutation(async (opts) => {
            const { ctx } = opts

            console.log("Server received logout mutation! Context:", ctx);
            await lucia.invalidateSession(ctx.session.id);
        }),

    addLink: protectedProcedure
        .input(z.object({
            link: z.string().url(),
            name: z.string(),
            tags: z.array(z.string()),
            notes: z.string()
        }))
        .mutation(async (opts) => {
            const { input, ctx } = opts;

            console.log(`[User: ${ctx.user.id}] Received addLink mutation:`, input);

            const userId = ctx.user.id;
            const dateNow = new Date();

            // Get Existing or Create New Tag

            type Tag = typeof tags.$inferInsert;

            const tagObjects: Tag[] = [];

            for (var tagName of input.tags) {

                const result = await db
                    .select().from(tags)
                    .where(
                        and(
                            eq(tags.userId, userId),
                            eq(tags.name, tagName)
                        )
                    )

                const tagExists = result.length > 0;
                if (!tagExists) {
                    // Create new tag
                    const result = await db.insert(tags).values({
                        id: generateId(15),
                        userId,
                        name: tagName,
                        createdAt: dateNow,
                        modifiedAt: dateNow,
                    }).returning();

                    const newTag = result[0];
                    tagObjects.push(newTag);

                    console.log("Created new tag", newTag)
                }
                else {
                    // Get existing tag
                    const existingTag = result[0];
                    tagObjects.push(existingTag);

                    console.log("Found existing tag", existingTag)
                }
            }


            // Create New Link

            const result = await db.insert(links).values({
                id: generateId(15),
                userId,
                url: input.link,
                name: input.name,
                notes: input.notes,
                createdAt: new Date(),
                modifiedAt: new Date()
            }).returning();

            const newLink = result[0];

            console.log("Created new link", newLink)

            // Create New Tagmaps

            for (var tag of tagObjects) {
                const result = await db.insert(tagMaps).values({
                    id: generateId(15),
                    userId,
                    linkId: newLink.id,
                    tagId: tag.id
                }).returning();

                const newTagMap = result[0];
                console.log("Created new tag map", newTagMap);
            }
        })
});

// export type definition of API
export type AppRouter = typeof trpcAppRouter;

export const appRouter = trpcExpress.createExpressMiddleware({
    router: trpcAppRouter,
    createContext,
})