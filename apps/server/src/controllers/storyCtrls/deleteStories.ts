import { Request, Response } from "express";
import Story from "../../models/Story";
import { BadRequestError } from "../../lib/bad-request-error";

// @desc    Delete story(ies)
// @route   DELETE /stories
// @access  Protected
const deleteStories = async (req: Request, res: Response) => {
  const storiesIds = req.body;
  const stories = await Story.find({
    _id: { $in: storiesIds },
    author: req.currentUser!.id,
  });

  if (stories.length <= 0)
    throw new BadRequestError({
      message: "Not authoried",
    });

  await Promise.allSettled(stories.map((story) => story.deleteOne()));
  res.json({
    message: "Deleted",
  });
};

export default deleteStories;
