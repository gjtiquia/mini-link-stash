
import type { Config } from "drizzle-kit";
import { env } from "./src/env";

export default {
    schema: "./src/lib/drizzle/schema.ts",
    out: "./drizzle",
    driver: "pg",
    dbCredentials: {
        connectionString: env.POSTGRES_CONNECTION_STRING
    },
    verbose: true,
    strict: true,
} satisfies Config;