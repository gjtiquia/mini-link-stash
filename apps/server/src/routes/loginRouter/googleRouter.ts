import express, { Request, Response } from "express"
import { generateCodeVerifier, generateState } from "arctic";
import { google } from "../../lib/arctic";
import { serializeCookie } from "oslo/cookie";

// References:
// - https://github.com/lucia-auth/examples/blob/main/express/github-oauth/routes/login/github.ts
// - https://github.com/lucia-auth/examples/blob/main/nextjs-pages/github-oauth/pages/api/login/github/index.ts
// - https://lucia-auth.com/tutorials/github-oauth/nextjs-pages
// - https://arctic.js.org/providers/google
// - https://arctic.js.org/guides/oauth2-pkce

export const googleRouter = express.Router();

googleRouter.get("/", async (req: Request, res: Response) => {

    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    const url = await google.createAuthorizationURL(state, codeVerifier, {
        scopes: ["email"]
    });

    return res

        // Sets cookies in client browser
        .appendHeader(
            "Set-Cookie",
            serializeCookie(GOOGLE_OAUTH_STATE, state, {
                path: "/",
                secure: process.env.NODE_ENV === "production",
                httpOnly: true,
                maxAge: 60 * 10,
                sameSite: "lax"
            })
        )

        // Redirects client to Google Login
        .redirect(url.toString());
})

// CONSTANTS
const GOOGLE_OAUTH_STATE = "google_oauth_state";