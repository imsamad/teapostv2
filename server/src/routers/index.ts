import express from "express";
import authRtr from "./authRtr";
import storyRtr from "./storyRtr";
import tagRtr from "./tagRtr";
import assetRtr from "./assetRtr";
import gradeRtr from "./gradeRtr";

const routers = express();

routers.use("/auth", authRtr);
routers.use("/stories", storyRtr);
routers.use("/tags", tagRtr);
routers.use("/assets", assetRtr);
routers.use("/grade", gradeRtr);

routers.all(["/", "/health"], (_, res) => {
  res.send("Running");
});

export default routers;
