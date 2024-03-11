import { Request, Response } from 'express';
import { validateRequest } from '../../middlewares/validate-request';
import { LooseCommentSchema } from '../../shared-lib/schemas/comment';
import { MongoIdParamsSchema } from '../../shared-lib/schemas/main';
import Story from '../../models/Story';
import { BadRequestError } from '../../lib/bad-request-error';
import Comment from '../../models/Comment';
// @desc    Comment On story
// @route   POST /comments/story/:storyId
// @access  Protected

const commentOnStory = async (req: Request, res: Response) => {
  const story = await Story.findById(req.params.storyId);
  if (!story) throw new BadRequestError({ message: 'Story does not exist' });

  let comment = await Comment.create({
    title: req.body.title,
    parentStory: story._id,
    user: req.currentUser!.id,
  });

  story.set('noOfComments', story.noOfComments + 1);
  await story.save();

  res.json(comment);
};

export default [
  validateRequest(MongoIdParamsSchema('storyId'), 'params'),
  validateRequest(LooseCommentSchema, 'body'),
  commentOnStory,
];
