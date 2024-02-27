import express from "express";
import * as storyCtrl from "../controllers/storyCtrls";
import { requireAuth } from "../middlewares/auth";

const storyRtr = express.Router();

storyRtr.route("/").post(requireAuth, storyCtrl.createStory);
storyRtr.route("/:storyId").get(storyCtrl.getStory);

export default storyRtr;
