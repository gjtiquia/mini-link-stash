import express from "express"
import cors from "cors";
import { env } from "./env";
import { loginRouter, appRouter } from "./routes";

const app = express();
const PORT = env.PORT;

// Global Middleware
app.use(cors({
    origin: [env.WEB_APP_URL]
}));

// Set Routes
app.use("/login", loginRouter);
app.use("/app", appRouter)

app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
    console.log("WEB_APP_URL:", env.WEB_APP_URL);

    if (!env.IS_PRODUCTION) {
        console.log('Press Ctrl+C to quit.');
    }
});

