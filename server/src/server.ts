import "express-async-errors";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";

import { NotFoundErrorMdlwr } from "./middlewares/not-found-mdlwr";
import { errorHandler } from "./middlewares/error-handler-mdlwr";
import routers from "./routers";
import { errorLogger } from "./middlewares/error-logger";
import { currentUser } from "./middlewares/auth";
import fileUpload from "express-fileupload";

const app = express();

app.set("trust proxy", true);
app.enable("trust proxy");

app.disable("x-powered-by");

app.use(express.json());
app.use(express.text());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: Number(process.env.MAX_ASSET_SIZE) },
    createParentPath: true,
  })
);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(","),
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.text());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.use(currentUser);

app.use("/assets", express.static(path.join(process.cwd(), "/public/assets")));

app.use(process.env.VERSION!, routers);

app.get("/", (_, res) => {
  return res.json("Ok running!");
});

app.use(() => {
  throw new NotFoundErrorMdlwr();
});

app.use(errorLogger);
app.use(errorHandler);

export { app };
