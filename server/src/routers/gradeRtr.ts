import express from "express";
import { requireAuth } from "../middlewares/auth";
import likeOrDislikeStory from "../controllers/likeNDislike";

const gradeRtr = express.Router();

gradeRtr.route("/like/:storyId").put(requireAuth, likeOrDislikeStory(true));
gradeRtr.route("/dislike/:storyId").put(requireAuth, likeOrDislikeStory(false));

export default gradeRtr;
