import { protectedProcedure } from "../../lib/trpc";
import { db, links, tagMaps, tags } from '../../lib/drizzle';
import { and, eq, desc } from 'drizzle-orm';

type Link = typeof links.$inferSelect;
type Tag = typeof tags.$inferSelect;
interface LinkWithTags extends Link {
    tags: Tag[]
}

export function getRecentLinksProcedure() {
    return protectedProcedure
        .query(async (opts) => {

            const { ctx } = opts;
            console.log(`[${ctx.user.email}] Get Recent Links`);

            // TODO : limit to top 5

            // WIP
            // const result = await db.select()
            //     .from(tagMaps)
            //     .where(eq(tagMaps.userId, ctx.user.id))
            //     .leftJoin(links, eq(tagMaps.linkId, links.id))
            //     .leftJoin(tags, eq(tagMaps.tagId, tags.id))
            // console.log(result);

            // =========== Simple, just links, no tags
            const recentLinks = await db.select().from(links)
                .where(eq(links.userId, ctx.user.id))
                .orderBy(desc(links.modifiedAt))

            console.log(`[${ctx.user.email}] Get Recent Links Success!`);
            return recentLinks;
            // ===========
        })
}