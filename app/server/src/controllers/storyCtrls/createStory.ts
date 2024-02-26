import { Request, Response } from "express";
import { validateRequest } from "../../middlewares/validate-request";
import { LooseStorySchema } from "shared";
import Story from "../../models/Story";
import User from "../../models/User";

// @desc    create story
// @route   POST
// @access  Protected
const createStory = async (req: Request, res: Response) => {
  const author = req.currentUser!.id;

  const storyExist = await Story.findOne({
    $or: [{ slug: req.body.slug }],
  });

  req.body.author = author;
  if (storyExist && author == storyExist.author)
    return res.json({
      story: storyExist,
    });

  const story = await Story.create(req.body);
  await User.findByIdAndUpdate(author, { $inc: { stories: 1 } });
  res.json(story);
};

export default [validateRequest(LooseStorySchema, "body"), createStory];
