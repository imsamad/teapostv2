import { Request, Response } from "express";
import Story from "../../models/Story";
import { BadRequestError } from "../../lib/bad-request-error";
import { readingTime } from "../../lib/utils";
import { validateRequest } from "../../middlewares/validate-request";
import { MongoIdParamsSchema } from "../../shared-lib/schemas/main";
import { LooseStorySchema } from "../../shared-lib";

// @desc    Update story
// @route   GET /stories/:storyId
// @access  Protected
const editStory = async (req: Request, res: Response) => {
  const storyId = req.params.storyId;

  const story = await Story.findById(storyId);
  // @ts-ignore
  if (!story || story.author != req.currentUser!.id)
    throw new BadRequestError({
      message: "Story does not exist",
    });

  const { title, slug, posterImage, description, seoKeywords, tags } = req.body;
  // @ts-ignore

  story.set("slug", slug || story.slug);
  // @ts-ignore
  story.set("title", title || story.title);
  // @ts-ignore
  story.set("subtitle", subtitle || story.subtitle);
  // @ts-ignore
  story.set("posterImage", posterImage || story.posterImage);
  // @ts-ignore
  story.set("description", description || story.description);
  // @ts-ignore
  story.set("seoKeywords", seoKeywords || story.seoKeywords);
  // @ts-ignore
  story.set("tags", tags || story.tags);
  story.set("readingTime", description ? readingTime(description) : 0);

  res.json(await story.save());
};

export default [
  validateRequest(MongoIdParamsSchema("storyId"), "params"),
  validateRequest(LooseStorySchema(false), "body"),
  editStory,
];
