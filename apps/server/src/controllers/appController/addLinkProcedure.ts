import { protectedProcedure } from "../../lib/trpc";
import { z } from 'zod';
import { db, links, tagMaps, tags } from '../../lib/drizzle';
import { generateId } from 'lucia';
import { and, eq } from 'drizzle-orm';

type Tag = typeof tags.$inferInsert;
type Link = typeof links.$inferInsert;

export function addLinkProcedure() {
    return protectedProcedure
        .input(z.object({
            link: z.string().url(),
            name: z.string(),
            tags: z.array(z.string()),
            notes: z.string()
        }))
        .mutation(async (opts) => {
            const { input, ctx } = opts;

            console.log(`[${ctx.user.email}] Add Link:`, input);

            const userId = ctx.user.id;
            const dateNow = new Date();
            const tags: Tag[] = [];

            for (var tagName of input.tags) {
                const tag = await getExistingOrCreateNewTagAsync(userId, tagName, dateNow);
                tags.push(tag);
            }

            const newLink = await createNewLinkAsync({
                userId,
                link: input.link,
                name: input.name,
                tags: input.tags,
                notes: input.notes,
                date: dateNow
            });

            await createNewTagmapsAsync(userId, newLink, tags);

            console.log(`[${ctx.user.email}] Add Link Success!`);
        });
}

async function createNewTagmapsAsync(userId: string, newLink: Link, tags: Tag[]) {
    for (var tag of tags) {
        await db.insert(tagMaps).values({
            id: generateId(15),
            userId,
            linkId: newLink.id,
            tagId: tag.id
        })
    }
}

async function getExistingOrCreateNewTagAsync(userId: string, tagName: string, date: Date) {
    const existingTag = await tryGetExistingTagAsync(userId, tagName);
    if (existingTag !== null)
        return existingTag;

    return await createNewTagAsync(userId, tagName, date);
}

async function tryGetExistingTagAsync(userId: string, tagName: string) {
    const result = await db
        .select().from(tags)
        .where(
            and(
                eq(tags.userId, userId),
                eq(tags.name, tagName)
            )
        );

    const tagExists = result.length > 0;
    if (!tagExists)
        return null;

    const existingTag = result[0];
    return existingTag;
}

async function createNewTagAsync(userId: string, tagName: string, date: Date) {
    const result = await db.insert(tags).values({
        id: generateId(15),
        userId,
        name: tagName,
        createdAt: date,
        modifiedAt: date,
    }).returning();

    const newTag = result[0];
    return newTag;
}

async function createNewLinkAsync(params: { userId: string, link: string; name: string; tags: string[]; notes: string; date: Date }) {
    const result = await db.insert(links).values({
        id: generateId(15),
        userId: params.userId,
        url: params.link,
        name: params.name,
        notes: params.notes,
        createdAt: params.date,
        modifiedAt: params.date
    }).returning();

    const newLink = result[0];
    return newLink;
}