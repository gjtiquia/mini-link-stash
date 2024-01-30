import "dotenv/config" // import from .env before anything else!

export const env = {
    PORT: (() => {
        if (!process.env.PORT)
            throw new Error("PORT undefined!");

        return process.env.PORT;
    })(),
}