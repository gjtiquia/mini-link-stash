import "dotenv/config" // import from .env before anything else!

export const env = {
    PORT: (() => {
        if (!process.env.PORT)
            throw new Error("PORT undefined!");

        return process.env.PORT;
    })(),

    POSTGRES_CONNECTION_STRING: (() => {
        if (!process.env.POSTGRES_CONNECTION_STRING)
            throw new Error("POSTGRES_CONNECTION_STRING undefined!");

        return process.env.POSTGRES_CONNECTION_STRING;
    })(),
}