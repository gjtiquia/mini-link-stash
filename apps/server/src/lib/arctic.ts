import { Google } from "arctic";
import { env } from "../env";

// References
// - https://arctic.js.org/providers/google

const clientId = env.GOOGLE_CLIENT_ID;
const clientSecret = env.GOOGLE_CLIENT_SECRET;
const redirectURI = env.GOOGLE_REDIRECT_URI;

export const google = new Google(clientId, clientSecret, redirectURI);