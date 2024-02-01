
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
    id: text("id").primaryKey(),
    email: text("email").notNull()
});

export const sessions = pgTable("session", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date"
    }).notNull()
});

export const links = pgTable("link", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id),
    name: text("name"),
    notes: text("notes"),
    createdAt: timestamp("created_at").notNull(),
    modifiedAt: timestamp("modified_at").notNull(),
})

export const tags = pgTable("tag", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id),
    name: text("name"),
    createdAt: timestamp("created_at").notNull(),
    modifiedAt: timestamp("modified_at").notNull(),
})

export const tagMaps = pgTable("tagmap", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id),
    linkId: text("link_id")
        .notNull()
        .references(() => links.id),
    tagId: text("tag_id")
        .notNull()
        .references(() => tags.id),
})