import express, { Request, Response } from "express"

export const loginRouter = express.Router();

loginRouter.get("/hello", (req: Request, res: Response) => {
    return res.send("world from login!").status(200);
})