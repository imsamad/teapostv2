import express from 'express';
import { requireAuth } from '../middlewares/auth';
import commentCtrls from '../controllers/commentCtrl';

const commentsRtr = express.Router();

commentsRtr
  .route('/:commentId')
  .put(requireAuth, commentCtrls.editComment)
  .delete(requireAuth, commentCtrls.deleteComment);

commentsRtr
  .route('/story/:storyId')
  .post(requireAuth, commentCtrls.commentOnStory)
  .get(commentCtrls.getCommentsOnStory);

commentsRtr
  .route('/comment/:commentId')
  .post(requireAuth, commentCtrls.commentOnComment)
  .get(commentCtrls.getCommentsOnComment);

export default commentsRtr;
