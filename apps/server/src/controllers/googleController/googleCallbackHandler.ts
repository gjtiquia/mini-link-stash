import type { Request, Response } from "express"
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { parseCookies } from "oslo/cookie";
import { eq } from "drizzle-orm";
import { google } from "../../lib/arctic";
import { db, users } from "../../lib/drizzle";
import { lucia } from "../../lib/lucia";
import { GOOGLE_OAUTH_STATE, GOOGLE_OAUTH_CODE_VERIFIER } from "./cookieKeys";

export async function googleCallbackHandler(req: Request, res: Response) {

    const { code, state } = getDataFromQueryParams(req);
    const { storedCodeVerifier, storedState } = getDataFromCookies(req);

    if (!code || !state || !storedCodeVerifier || !storedState || state !== storedState)
        return res.status(400).end();

    try {
        const googleUser = await validateAndFetchGoogleUserAsync(code, storedCodeVerifier);
        const userId = await getExistingOrCreateNewUserAsync(googleUser.email);

        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        const redirectUrl = "https://mini-link-stash.netlify.app/#/";

        return res
            .appendHeader("Set-Cookie", sessionCookie.serialize())
            .redirect(redirectUrl);

    } catch (e) {

        // the specific error message depends on the provider
        if (e instanceof OAuth2RequestError) {

            // invalid code
            return new Response(null, {
                status: 400
            });
        }

        return res.status(500).end();
    }
}

function getDataFromCookies(req: Request) {

    const cookies = parseCookies(req.headers.cookie ?? "");

    const storedState = cookies.get(GOOGLE_OAUTH_STATE) ?? null;
    const storedCodeVerifier = cookies.get(GOOGLE_OAUTH_CODE_VERIFIER) ?? null;

    return { storedCodeVerifier, storedState };
}

function getDataFromQueryParams(req: Request) {

    const code = req.query.code?.toString() ?? null;
    const state = req.query.state?.toString() ?? null;

    return { code, state };
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

    return googleUser;
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
