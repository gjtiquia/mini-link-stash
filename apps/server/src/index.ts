import { db } from "./lib/drizzle"

async function main() {
    await db.select()
}

main();