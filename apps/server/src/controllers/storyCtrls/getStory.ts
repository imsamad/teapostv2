import { Request, Response } from "express";
import Story from "../../models/Story";
import { BadRequestError } from "../../lib/bad-request-error";

// @desc    Get story by id
// @route   GET
// @access  Public/Protected
const getStory = async (req: Request, res: Response) => {
  const storyId = req.params.storyId;

  const story = await Story.findById(storyId);

  if (!story) {
    throw new BadRequestError({
      message: "Resource not found!",
    });
  }

  if (
    story.isPublished ||
    req.currentUser?.isAdmin ||
    (!story?.isPublished && req?.currentUser!.id == story.author.toString())
  )
    return res.json(story);

  throw new BadRequestError({
    message: "Resource not found!",
  });
};
export default getStory;
