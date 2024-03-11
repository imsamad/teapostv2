import { Request, Response } from 'express';
import { validateRequest } from '../../middlewares/validate-request';
import { LooseCommentSchema } from '../../shared-lib/schemas/comment';
import { MongoIdParamsSchema } from '../../shared-lib/schemas/main';
import { BadRequestError } from '../../lib/bad-request-error';

import Comment from '../../models/Comment';

// @desc    Comment On Comment
// @route   POST /comments/comment/:commentId
// @access  Protected

const commentOnComment = async (req: Request, res: Response) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment)
    throw new BadRequestError({ message: 'Comment does not exist' });

  let replyToComemnt = await Comment.create({
    title: req.body.title,
    parentComment: comment._id,
    user: req.currentUser!.id,
  });

  res.json(replyToComemnt);
};

export default [
  validateRequest(MongoIdParamsSchema('commentId'), 'params'),
  validateRequest(LooseCommentSchema, 'body'),
  commentOnComment,
];
