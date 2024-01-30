import type { Request, Response } from "express";
import { generateCodeVerifier, generateState } from "arctic";
import { serializeCookie } from "oslo/cookie";
import { google } from "../../lib/arctic";
import { GOOGLE_OAUTH_STATE, GOOGLE_OAUTH_CODE_VERIFIER } from "./cookieKeys";
import { env } from "../../env";

export async function googleRedirectHandler(req: Request, res: Response) {

    // Skip google auth in local development
    if (!env.IS_PRODUCTION)
        return res.redirect("/login/google/callback")

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
    };

    return res
        // Set cookies in client browser for access in callback from google
        .appendHeader(
            "Set-Cookie",
            serializeCookie(GOOGLE_OAUTH_STATE, state, cookieAttributes)
        )
        .appendHeader(
            "Set-Cookie",
            serializeCookie(GOOGLE_OAUTH_CODE_VERIFIER, codeVerifier, cookieAttributes)
        )

        // Redirects client to Google OAuth Consent Screen
        .redirect(url.toString());
}
