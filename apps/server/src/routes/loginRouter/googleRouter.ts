import express, { Request, Response } from "express"

// References:
// - https://github.com/lucia-auth/examples/blob/main/express/github-oauth/routes/login/github.ts
// - https://arctic.js.org/providers/google

export const googleRouter = express.Router();

googleRouter.get("/", (req: Request, res: Response) => {

    // TODO : Randomly redirect to google
    // TODO : Redirect to google auth
    return res
        .redirect("https://google.com");
})