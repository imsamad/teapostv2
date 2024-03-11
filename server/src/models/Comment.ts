import mongoose, {
  CallbackWithoutResultAndOptionalError,
  Document,
} from 'mongoose';
import { TCommentSchema } from '../shared-lib/schemas/comment';
import { MongooseValidationError } from '../lib/mongoose-validation-error';

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Requried to mention author'],
  },
  title: {
    type: String,
    required: [true, 'It is required'],
  },
  parentStory: {
    type: mongoose.Types.ObjectId,
    ref: 'Story',
  },
  parentComment: {
    type: mongoose.Types.ObjectId,
    ref: 'Comment',
  },
});

interface CommentSchemaDoc extends Omit<TCommentSchema, 'id'>, Document {}

commentSchema.post(
  'save',
  async function postSaveErrorHandler(
    error: any,
    doc: CommentSchemaDoc,
    next: CallbackWithoutResultAndOptionalError
  ) {
    next(new MongooseValidationError(error));
  }
);

const Comment = mongoose.model<CommentSchemaDoc>('Comment', commentSchema);

export default Comment;
