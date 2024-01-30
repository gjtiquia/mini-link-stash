import express from "express"
import type { Request, Response } from "express" // Use type import so will not compile into JavaScript
import { OAuth2RequestError, generateCodeVerifier, generateState } from "arctic";
import { generateId } from "lucia";
import { serializeCookie, parseCookies } from "oslo/cookie";
import { eq } from "drizzle-orm";
import { google } from "../../lib/arctic";
import { db, users } from "../../lib/drizzle";
import { lucia } from "../../lib/lucia";

// References:
// - https://github.com/lucia-auth/examples/blob/main/express/github-oauth/routes/login/github.ts
// - https://github.com/lucia-auth/examples/blob/main/nextjs-pages/github-oauth/pages/api/login/github/index.ts
// - https://lucia-auth.com/guides/oauth/basics
// - https://lucia-auth.com/tutorials/github-oauth/nextjs-pages //! note that req.cookies is only valid in NextJS
// - https://arctic.js.org/providers/google
// - https://arctic.js.org/guides/oauth2-pkce


export const googleRouter = express.Router();

googleRouter.get("/", async (req: Request, res: Response) => {

    console.log("login request from ", req.headers);

    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    const url = await google.createAuthorizationURL(state, codeVerifier, {
        scopes: ["email"]
    });

    const cookieAttributes = {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true, // Client browser cannot access this cookie
        maxAge: 60 * 10,
        sameSite: "lax" as const
    }

    return res
        // Sets cookies in client browser
        .appendHeader(
            "Set-Cookie",
            serializeCookie(GOOGLE_OAUTH_STATE, state, cookieAttributes)
        )
        .appendHeader(
            "Set-Cookie",
            serializeCookie(GOOGLE_OAUTH_CODE_VERIFIER, codeVerifier, cookieAttributes)
        )

        // Redirects client to Google Login
        .redirect(url.toString());
})

googleRouter.get("/callback", async (req: Request, res: Response) => {

    const code = req.query.code?.toString() ?? null;
    const state = req.query.state?.toString() ?? null;

    const cookies = parseCookies(req.headers.cookie ?? "");
    const storedState = cookies.get(GOOGLE_OAUTH_STATE) ?? null;
    const storedCodeVerifier = cookies.get(GOOGLE_OAUTH_CODE_VERIFIER) ?? null;

    if (!code || !state || !storedCodeVerifier || !storedState || state !== storedState) {
        console.log("Invalid Credentials!");

        console.log("code", code);
        console.log("state", state);
        console.log("storedCodeVerifier", storedCodeVerifier);
        console.log("storedState", storedState);

        console.log("state is equals", state === storedState)

        res.status(400).end();
        return;
    }

    try {
        const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);

        const googleUserResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        });

        console.log("googleUserResponse", googleUserResponse);

        const googleUser: GoogleUser = await googleUserResponse.json();

        console.log("googleUser", googleUser);

        const userQueryResult = await db.select().from(users).where(eq(users.email, googleUser.email));
        const userExists = userQueryResult.length > 0;

        if (userExists) {
            console.log(`User ${googleUser.email} exists!`);

            const existingUser = userQueryResult[0];
            const session = await lucia.createSession(existingUser.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);

            return res
                .appendHeader("Set-Cookie", sessionCookie.serialize())

                // TODO : For now hardcode
                .redirect("https://mini-link-stash.netlify.app/#/");
        }

        console.log(`User ${googleUser.email} does not exist! Creating new user...`);

        const userId = generateId(15);

        await db.insert(users).values({
            id: userId,
            email: googleUser.email
        })

        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        return res
            .appendHeader("Set-Cookie", sessionCookie.serialize())

            // TODO : Redirect back to mini-link-stash/dashboard
            // TODO : Seems... better to be able to pass this all the way from the client?
            // TODO : For now hardcode
            .redirect("https://mini-link-stash.netlify.app/#/");

    } catch (e) {
        // the specific error message depends on the provider
        if (e instanceof OAuth2RequestError) {
            // invalid code
            return new Response(null, {
                status: 400
            });
        }
        res.status(500).end();
        return;
    }
})

interface GoogleUser {
    email: string
}

// CONSTANTS
const GOOGLE_OAUTH_STATE = "google_oauth_state";
const GOOGLE_OAUTH_CODE_VERIFIER = "google_oauth_code_verifier";