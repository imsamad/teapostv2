import { Request, Response } from 'express';
import { validateRequest } from '../../middlewares/validate-request';

import { MongoIdParamsSchema } from '../../shared-lib/schemas/main';

import Comment from '../../models/Comment';
import advancePagination from '../../middlewares/advancePagination';

// @desc    Comment On Comment
// @route   POST /comments/comment/:commentId
// @access  Protected

const getStoryOnComments = async (req: Request, res: Response) => {
  return await advancePagination({
    model: Comment,
    extraQuery: {
      parentStory: req.params.storyId,
    },
    regExFields: ['title'],
  })(req, res);
};

export default [
  validateRequest(MongoIdParamsSchema('storyId'), 'params'),
  getStoryOnComments,
];
