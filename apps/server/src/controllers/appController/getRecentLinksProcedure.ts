import { protectedProcedure } from "../../lib/trpc";
import { db, links, tagMaps, tags } from '../../lib/drizzle';
import { and, eq, desc, inArray } from 'drizzle-orm';

type Link = typeof links.$inferSelect;
type Tag = typeof tags.$inferSelect;

export function getRecentLinksProcedure() {
    return protectedProcedure
        .query(async (opts) => {

            const { ctx } = opts;
            console.log(`[${ctx.user.email}] Get Recent Links`);

            /* Left joins
            
            Have links
            Each link may have tag maps => Each link may have a tags
            
            */

            /* Sub-Query
            
            Use sub-query to limit the number of links.
            Don't use limit on the tags query directly, because number of objects != number of rows.
            Each tag is a row.

            References:

            - https://dncrews.com/limit-and-offset-can-work-with-join-f03327fa2ad3
            SELECT *
            FROM article
            LEFT JOIN author ON article.author_id = author.id
            LEFT JOIN tag ON article.id = tag.article_id
            WHERE id IN (
                SELECT id FROM article
                LIMIT 7
            );

            - https://orm.drizzle.team/docs/operators#inarray
            SELECT * 
            FROM table 
            WHERE table.column IN (
                SELECT table2.column FROM table2
            )

            */

            const linkSubQuery = db.select({ id: links.id })
                .from(links)
                .where(eq(links.userId, ctx.user.id))
                .orderBy(desc(links.modifiedAt)) // This ensures the limit is from the most recent 5
                .limit(10)
            // .offset(10) // Used for pagination. 0 => 10 => 20

            const rows = await db.select()
                .from(links)
                .orderBy(desc(links.modifiedAt)) // This ensures the output is in descending order
                .leftJoin(tagMaps, eq(links.id, tagMaps.linkId))
                .leftJoin(tags, eq(tagMaps.tagId, tags.id))
                .where(inArray(links.id, linkSubQuery))

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

            console.log(`[${ctx.user.email}] Get Recent Links Success!`, result.map(x => ({ link: x.link.url, date: x.link.modifiedAt, tags: x.tags.map(y => y.name) })));
            return result;
        })
}