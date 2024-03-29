import "dotenv/config" // import from .env before anything else!

export const env = {

    IS_PRODUCTION: (() => {
        if (!process.env.NODE_ENV)
            throw new Error("NODE_ENV undefined!");

        return process.env.NODE_ENV === "production";
    })(),

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

    GOOGLE_CLIENT_ID: (() => {
        if (!process.env.GOOGLE_CLIENT_ID)
            throw new Error("GOOGLE_CLIENT_ID undefined!");

        return process.env.GOOGLE_CLIENT_ID;
    })(),

    GOOGLE_CLIENT_SECRET: (() => {
        if (!process.env.GOOGLE_CLIENT_SECRET)
            throw new Error("GOOGLE_CLIENT_SECRET undefined!");

        return process.env.GOOGLE_CLIENT_SECRET;
    })(),

    GOOGLE_REDIRECT_URI: (() => {
        if (!process.env.GOOGLE_REDIRECT_URI)
            throw new Error("GOOGLE_REDIRECT_URI undefined!");

        return process.env.GOOGLE_REDIRECT_URI;
    })(),

    WEB_APP_URL: (() => {
        if (!process.env.WEB_APP_URL)
            throw new Error("WEB_APP_URL undefined!");

        return process.env.WEB_APP_URL;
    })(),
}