import { Request, Response } from "express";
import Story from "../../models/Story";
import { BadRequestError } from "../../lib/bad-request-error";
import { readingTime } from "../../lib/utils";
// @desc    Update story
// @route   GET /stories/:storyId
// @access  Protected

const editStory = async (req: Request, res: Response) => {
  const storyId = req.params.storyId;

  const story = await Story.findById(storyId);

  if (!story || story.author != req.currentUser!.id)
    throw new BadRequestError({
      message: "Story does not exist",
    });

  const { title, slug, posterImage, description, seoKeywords, tags } = req.body;
  story.title = title || story.title;
  story.slug = slug || story.slug;
  story.posterImage = posterImage || story.posterImage;
  story.description = description || story.description;
  story.seoKeywords = seoKeywords || story.seoKeywords;
  story.tags = tags || story.tags;
  story.readingTime = description ? readingTime(description) : 0;

  res.json(await story.save());
};

export default editStory;
