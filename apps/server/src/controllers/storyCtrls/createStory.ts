import { Request, Response } from "express";
import { validateRequest } from "../../middlewares/validate-request";
import { LooseStorySchema } from "shared";
import Story from "../../models/Story";

// @desc    create story
// @route   POST /stories
// @access  Protected
const createStory = async (req: Request, res: Response) => {
  const author = req.currentUser!.id;

  const storyExist = await Story.findOne({
    $or: [{ slug: req.body.slug }],
  });

  if (storyExist && author == storyExist.author)
    return res.json({
      story: storyExist,
    });

  const story = await Story.create({ ...req.body, author });

  res.json(story);
};

export default [validateRequest(LooseStorySchema, "body"), createStory];
