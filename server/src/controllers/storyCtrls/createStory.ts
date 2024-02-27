import { Request, Response } from "express";
import { validateRequest } from "../../middlewares/validate-request";

import Story from "../../models/Story";
import { LooseStorySchema } from "../../shared-lib";

// @desc    create story
// @route   POST /stories
// @access  Protected
const createStory = async (req: Request, res: Response) => {
  const author = req.currentUser!.id;

  const storyExist = await Story.findOne({
    $or: [{ slug: req.body.slug }],
  });
  // @ts-ignore
  if (storyExist && author == storyExist.author)
    return res.json({
      story: storyExist,
    });

  const story = await Story.create({ ...req.body, author });

  res.json(story);
};

export default [validateRequest(LooseStorySchema, "body"), createStory];
