import express from "express";
import authRtr from "./authRtr";
import storyRtr from "./storyRtr";

const routers = express();

routers.use("/auth", authRtr);
routers.use("/stories", storyRtr);

routers.all("/health", (_, res) => {
  res.send("Running");
});

export default routers;
