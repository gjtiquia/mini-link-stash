import express from "express"
import type { Request, Response } from "express" // Use type import so will not compile into JavaScript
import { OAuth2RequestError, generateCodeVerifier, generateState } from "arctic";
import { generateId } from "lucia";
import { serializeCookie } from "oslo/cookie";
import { eq } from "drizzle-orm";
import { google } from "../../lib/arctic";
import { db, users } from "../../lib/drizzle";
import { lucia } from "../../lib/lucia";

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

googleRouter.get("/callback", async (req: Request, res: Response) => {

    const code = req.query.code?.toString() ?? null;
    const state = req.query.state?.toString() ?? null;
    const codeVerifier = req.query.codeVerifier?.toString() ?? null;

    if (!req.cookies) {
        console.log("No cookies!");
        console.log(req.query, req.cookies);
        res.status(400).end();
        return;
    }

    const storedState = req.cookies[GOOGLE_OAUTH_STATE] ?? null;

    if (!code || !state || !codeVerifier || !storedState || state !== storedState) {
        console.log("Invalid Credentials!");
        console.log(code, state, storedState);
        res.status(400).end();
        return;
    }

    try {
        const tokens = await google.validateAuthorizationCode(code, codeVerifier);

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
            const existingUser = userQueryResult[0];
            const session = await lucia.createSession(existingUser.id, {});

            return res
                .appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize())
                .redirect("/");
        }

        const userId = generateId(15);

        await db.insert(users).values({
            id: userId,
            email: googleUser.email
        })

        const session = await lucia.createSession(userId, {});
        return res
            .appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize())
            .redirect("/");
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