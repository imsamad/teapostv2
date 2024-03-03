import express from "express";
const tagRouter = express.Router();
import tagCtrl from "../controllers/tagCtrl";
import { requireAdmin } from "../middlewares/auth";

tagRouter.route("/").get(tagCtrl.getTags).post(requireAdmin, tagCtrl.createTag);

export default tagRouter;
