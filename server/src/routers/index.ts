import express from "express";
import authRouter from "./authRtr";
import { sendEmail } from "../lib/sendEmail";

const routers = express();

routers.use("/auth", authRouter);

export default routers;
