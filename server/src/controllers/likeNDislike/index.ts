import { Request, Response } from "express";
import StoryMeta from "../../models/StoryMeta";
import Story from "../../models/Story";
import { BadRequestError } from "../../lib/bad-request-error";
import { validateRequest } from "../../middlewares/validate-request";
import { MongoIdParamsSchema } from "../../shared-lib/schemas/main";

// @desc    Like and dislike
// @route   PUT /grade/:storyId/[like,dislike]
// @access  Protected

const likeOrDislikeStory =
  (isLiked: boolean) => async (req: Request, res: Response) => {
    const updates: any = {};
    const user = req.currentUser!.id;
    const storyUpdates: any = {};

    if (isLiked) {
      updates.$addToSet = { likedBy: user };
      updates.$pull = { dislikedBy: user };
      storyUpdates.$inc = { noOfLikes: 1 };
    } else {
      updates.$addToSet = { dislikedBy: user };
      updates.$pull = { likedBy: user };
      storyUpdates.$inc = { noOfDislikes: 1 };
    }

    const story = await Story.findById(req.params.storyId);

    if (!story)
      throw new BadRequestError({
        message: "Story does not exist",
      });

    const storyMeta = await StoryMeta.findByIdAndUpdate(
      req.params.storyId,
      updates,
      {
        upsert: true,
        new: true,
      }
    );

    story.set("noOfLikes", storyMeta.likedBy.length);
    story.set("noOfDislikes", storyMeta.dislikedBy.length);

    await story.save();

    res.json(storyMeta);
  };

export default (what: boolean) => [
  validateRequest(MongoIdParamsSchema("storyId"), "params"),
  likeOrDislikeStory(what),
];
