import express from "express";
import authRouter from "./authRtr";

const routers = express();

routers.use("/auth", authRouter);

routers.all("/health", (_, res) => {
  res.send("Running");
});

export default routers;
