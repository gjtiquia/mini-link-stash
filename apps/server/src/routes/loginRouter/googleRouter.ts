import express from "express"
import { googleRedirectHandler } from "../../controllers/googleController";
import { googleCallbackHandler } from "../../controllers/googleController/googleCallbackHandler";

export const googleRouter = express.Router();

googleRouter.get("/", googleRedirectHandler)
googleRouter.get("/callback", googleCallbackHandler)
