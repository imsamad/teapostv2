import express from "express";
import authRouter from "./authRtr";
import { sendEmail } from "../lib/sendEmail";

const routers = express();

routers.use("/auth", authRouter);

routers.get("/health", async (req, res) => {
  await sendEmail();
  res.json("Ok running!");
});

export default routers;
