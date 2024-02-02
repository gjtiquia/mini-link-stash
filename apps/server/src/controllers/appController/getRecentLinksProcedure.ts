import { protectedProcedure } from "../../lib/trpc";
import { db, links, tagMaps, tags } from '../../lib/drizzle';
import { and, eq, desc } from 'drizzle-orm';

type Link = typeof links.$inferSelect;
type Tag = typeof tags.$inferSelect;

export function getRecentLinksProcedure() {
    return protectedProcedure
        .query(async (opts) => {

            const { ctx } = opts;
            console.log(`[${ctx.user.email}] Get Recent Links`);

            // TODO : limit to top 5

            // Have links
            // Each link may have tag maps => Each link may have a tags
            // => Left joins

            const rows = await db.select()
                .from(links)
                .where(eq(links.userId, ctx.user.id))
                .leftJoin(tagMaps, eq(links.id, tagMaps.linkId))
                .leftJoin(tags, eq(tagMaps.tagId, tags.id))
                .orderBy(desc(links.modifiedAt))

            const result = rows.reduce<{ link: Link, tags: Tag[] }[]>((acc, row) => {

                const link = row.link;
                const tag = row.tag;

                for (let element of acc) {
                    if (element.link.id == link.id) {
                        if (!tag)
                            return acc;

                        element.tags.push(tag)
                        return acc;
                    }
                }

                if (!tag)
                    acc.push({ link, tags: [] })
                else
                    acc.push({ link, tags: [tag] })

                return acc
            }, [])

            return result;
        })
}