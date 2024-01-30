export const env = {
    VITE_API_URL: (() => {
        if (!import.meta.env.VITE_API_URL)
            throw new Error("VITE_API_URL undefined!");

        return import.meta.env.VITE_API_URL;
    })(),
}