import { Request, Response } from 'express';
import { validateRequest } from '../../middlewares/validate-request';

import { MongoIdParamsSchema } from '../../shared-lib/schemas/main';

import Comment from '../../models/Comment';
import advancePagination from '../../middlewares/advancePagination';

// @desc    Comment On Comment
// @route   GET /comments/comment/:commentId
// @access  Public

const getCommentsOnComment = async (req: Request, res: Response) => {
  return await advancePagination({
    model: Comment,
    extraQuery: {
      parentComment: req.params.commentId,
    },
    regExFields: ['title'],
  })(req, res);
};

export default [
  validateRequest(MongoIdParamsSchema('commentId'), 'params'),
  getCommentsOnComment,
];
