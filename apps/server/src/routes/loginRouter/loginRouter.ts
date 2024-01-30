import express from "express"
import { googleRouter } from "./googleRouter";

export const loginRouter = express.Router();

loginRouter.use("/google", googleRouter)