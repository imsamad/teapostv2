import { Request, Response } from 'express';
import { validateRequest } from '../../middlewares/validate-request';
import { MongoIdParamsSchema } from '../../shared-lib/schemas/main';
import Story from '../../models/Story';
import { BadRequestError } from '../../lib/bad-request-error';
import Comment from '../../models/Comment';

// @desc    Edit Comment
// @route   PUT /comments/:commentId
// @access  Protected

const editComment = async (req: Request, res: Response) => {
  const comment = await Comment.findOne({
    _id: req.params.commentId,
    user: req.currentUser!.id,
  });

  if (!comment)
    throw new BadRequestError({ message: 'Comment does not exist' });

  comment.set('title', req.body.title);

  res.json(await comment.save());
};

export default [
  validateRequest(MongoIdParamsSchema('commentId'), 'params'),
  editComment,
];
