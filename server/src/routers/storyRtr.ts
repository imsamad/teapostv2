import express from "express";
import * as storyCtrl from "../controllers/storyCtrls";
import { requireAuth } from "../middlewares/auth";

const storyRtr = express.Router();

storyRtr
  .route("/")
  .post(requireAuth, storyCtrl.createStory)
  .delete(requireAuth, storyCtrl.deleteStories)
  .get(storyCtrl.getStories);

storyRtr
  .route("/publish")
  .put(requireAuth, storyCtrl.publishUnpublishStories(true));

storyRtr
  .route("/unpublish")
  .put(requireAuth, storyCtrl.publishUnpublishStories(false));

storyRtr.route("/my").get(requireAuth, storyCtrl.myStories);

storyRtr
  .route("/:storyId")
  .get(storyCtrl.getStory)
  .put(requireAuth, storyCtrl.editStory);

export default storyRtr;
