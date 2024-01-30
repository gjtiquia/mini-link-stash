import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db, sessionTable, userTable } from "./drizzle"

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);
