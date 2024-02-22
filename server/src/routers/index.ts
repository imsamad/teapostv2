import express from "express";
import authRouter from "./authRtr";

const routers = express();

routers.use("/auth", authRouter);

export default routers;
