import { Request, Response } from "express";
import Story from "../../models/Story";
import { BadRequestError } from "../../lib/bad-request-error";
import { validateRequest } from "../../middlewares/validate-request";
import { MongoIdsArray } from "../../shared-lib";

// @desc    Delete story(ies)
// @route   DELETE /stories
// @access  Protected
const deleteStories = async (req: Request, res: Response) => {
  const storiesIds = req.body.stories;

  const stories = await Story.find({
    _id: { $in: [...new Set(storiesIds)] },
    author: req.currentUser!.id,
  });

  if (stories.length <= 0)
    throw new BadRequestError({
      message: "Stories does not exist",
    });

  await Promise.allSettled(stories.map((story) => story.deleteOne()));
  res.json({
    deletedStories: stories.map(({ _id }) => _id),
  });
};

export default [
  validateRequest(MongoIdsArray("stories"), "body"),
  deleteStories,
];
