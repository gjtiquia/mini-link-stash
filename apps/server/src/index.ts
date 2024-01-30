import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

async function main() {
    const client = new Client({
        connectionString: "postgres://postgres:12345678@localhost:5432/postgres",
    });

    await client.connect();
    const db = drizzle(client);

    console.log("Connection success!")
}

main();