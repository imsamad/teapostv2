import { Request, Response } from "express";
import Story from "../../models/Story";
import { validateRequest } from "../../middlewares/validate-request";
import { MongoIdsArray, StorySchema } from "../../shared-lib";
import { BadRequestError } from "../../lib/bad-request-error";
// @desc    Publsih story
// @route   POST /stories/[publish|unpublish]
// @access  Protected

const publishUnpublishStories =
  (isPublish: boolean) => async (req: Request, res: Response) => {
    const storiesId = req.body.stories;

    const filters: any = { _id: { $in: storiesId } };
    const update: any = {};
    if (req.currentUser?.isAdmin) {
      update.isPublishedByAdmin = false;
    } else {
      update.isPublished = false;
      filters.author = req.currentUser!.id;
    }

    if (!isPublish) {
      await Story.updateMany(filters, update);

      return res.json({
        message: "Unpublished successfully",
      });
    }

    const stories = await Story.find(filters);

    stories.forEach((story) => {
      const res = StorySchema.safeParse(story.toJSON());
      if (!res.success) {
        throw new BadRequestError({
          story: `${story.id} can not be publised`,
          reason: res.error.flatten().fieldErrors,
        });
      }
    });

    await Story.updateMany(filters, update);
    return res.json({
      message: "Changes comited successfully!",
    });
  };

export default (isPublish: boolean) => [
  validateRequest(MongoIdsArray("stories"), "body"),
  publishUnpublishStories(isPublish),
];
