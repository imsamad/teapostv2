import mongoose, { Document } from "mongoose";
import { TCommentSchema } from "../shared-lib/schemas/comment";

const commentSchema = new mongoose.Schema({
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Requried to mention author"],
  },
  title: {
    type: String,
    required: [true, "It is required"],
  },
  parentStory: {
    type: mongoose.Types.ObjectId,
    ref: "Story",
  },
  parentComment: {
    type: mongoose.Types.ObjectId,
    ref: "Comment",
  },
});

interface CommentSchemaDoc extends Omit<TCommentSchema, "id">, Document {}

const Comment = mongoose.model<CommentSchemaDoc>("Comment", commentSchema);

export default Comment;
