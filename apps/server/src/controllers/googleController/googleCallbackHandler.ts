import type { Request, Response } from "express"
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { parseCookies } from "oslo/cookie";
import { eq } from "drizzle-orm";
import { google } from "../../lib/arctic";
import { db, users } from "../../lib/drizzle";
import { lucia } from "../../lib/lucia";
import { env } from "../../env";
import { GOOGLE_OAUTH_STATE, GOOGLE_OAUTH_CODE_VERIFIER } from "./cookieKeys";

export async function googleCallbackHandler(req: Request, res: Response) {

    const { email, error } = await tryGetEmailFromGoogleCallback(req, res);
    if (error) {
        return res.status(error.code).end();
    }

    const userId = await getExistingOrCreateNewUserAsync(email);

    const session = await lucia.createSession(userId, {});
    const redirectUrl = env.WEB_APP_URL + "/#/login?access_token=" + session.id;

    // Cannot set cookies because the domain of the frontend and backend are not the same
    return res.redirect(redirectUrl);
}

async function tryGetEmailFromGoogleCallback(req: Request, res: Response) {

    // Skip verification in local development
    // Because Google OAuth requires a public redirect uri, does not allow localhost
    // This workaround is for quicker local development iteration.
    if (!env.IS_PRODUCTION) {
        const devEmail = process.env.DEV_EMAIL;
        if (!devEmail)
            throw new Error("DEV_EMAIL undefined!")

        return { email: devEmail };
    }

    const { code, state } = getDataFromQueryParams(req);
    const { storedCodeVerifier, storedState } = getDataFromCookies(req);

    if (!code || !state || !storedCodeVerifier || !storedState || state !== storedState)
        return { error: { code: 400 } }

    try {
        const email = await validateAndFetchGoogleUserAsync(code, storedCodeVerifier);
        return { email }

    } catch (e) {
        // the specific error message depends on the provider
        if (e instanceof OAuth2RequestError) {
            // invalid code
            return { error: { code: 400 } }
        }

        return { error: { code: 500 } }
    }
}

function getDataFromQueryParams(req: Request) {

    // Data after redirecting from Google

    const code = req.query.code?.toString() ?? null;
    const state = req.query.state?.toString() ?? null;

    return { code, state };
}

function getDataFromCookies(req: Request) {

    // Data before redirecting to Google

    const cookies = parseCookies(req.headers.cookie ?? "");

    const storedState = cookies.get(GOOGLE_OAUTH_STATE) ?? null;
    const storedCodeVerifier = cookies.get(GOOGLE_OAUTH_CODE_VERIFIER) ?? null;

    return { storedCodeVerifier, storedState };
}

interface GoogleUser {
    email: string;
}

async function validateAndFetchGoogleUserAsync(code: string, storedCodeVerifier: string) {

    const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);

    const googleUserResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
        headers: {
            Authorization: `Bearer ${tokens.accessToken}`
        }
    });

    const googleUser: GoogleUser = await googleUserResponse.json();
    return googleUser.email;
}

async function getExistingOrCreateNewUserAsync(email: string) {
    const existingUser = await tryGetExistingUserAsync(email);

    if (existingUser !== null) {
        return existingUser.id;
    }

    return await createNewUserAsync(email);
}

async function tryGetExistingUserAsync(email: string) {

    const userQueryResult = await db.select().from(users).where(eq(users.email, email));
    const existingUser = userQueryResult.length > 0 ? userQueryResult[0] : null;

    return existingUser;
}

async function createNewUserAsync(email: string) {
    const userId = generateId(15);

    await db.insert(users).values({
        id: userId,
        email
    });

    return userId;
}
