import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres"
import { env } from "../../env";

const connectionString = env.POSTGRES_CONNECTION_STRING;
const queryClient = postgres(connectionString);

export const db = drizzle(queryClient);