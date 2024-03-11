import { Request, Response } from 'express';
import { validateRequest } from '../../middlewares/validate-request';
import { MongoIdParamsSchema } from '../../shared-lib/schemas/main';
import Story from '../../models/Story';
import { BadRequestError } from '../../lib/bad-request-error';
import Comment from '../../models/Comment';
import { LooseCommentSchema } from '../../shared-lib/schemas/comment';

// @desc    Delete comment
// @route   DELETE /comments/:commentId
// @access  Protected

const deleteComment = async (req: Request, res: Response) => {
  const comment = await Comment.findOne({
    _id: req.params.commentId,
    user: req.currentUser!.id,
  });

  if (!comment)
    throw new BadRequestError({ message: 'Comment does not exist' });

  if (comment.parentStory) {
    const story = await Story.findById(comment.parentStory.toString());
    if (story) {
      story.set('noOfComments', story.noOfComments + 1);
      await story.save();
    }
  }
  await comment.deleteOne();

  res.json({
    message: 'Deleted',
  });
};

export default [
  validateRequest(MongoIdParamsSchema('commentId'), 'params'),
  validateRequest(LooseCommentSchema, 'body'),
  deleteComment,
];
