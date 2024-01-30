import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { env } from './src/env';

async function runMigrationAsync() {
    const connectionString = env.POSTGRES_CONNECTION_STRING;
    const migrationClient = postgres(connectionString, { max: 1 });

    const db = drizzle(migrationClient);

    await migrate(db, { migrationsFolder: "./drizzle" });

    // Don't forget to close the connection, otherwise the script will hang
    await migrationClient.end();
}

runMigrationAsync();