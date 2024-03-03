import mongoose from "mongoose";
import { CallbackWithoutResultAndOptionalError } from "mongoose";
import { MongooseValidationError } from "../lib/mongoose-validation-error";

interface Tag {
  title: string;
  id: string;
}

interface TagDoc extends Omit<Tag, "id">, mongoose.Document {}

const tagSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc: any, ret: any) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
      },
      virtuals: true,
    },
  }
);

tagSchema.post(
  "save",
  async function postSaveErrorHandler(
    error: any,
    doc: TagDoc,
    next: CallbackWithoutResultAndOptionalError
  ) {
    next(new MongooseValidationError(error));
  }
);

const Tag = mongoose.model<TagDoc>("Tag", tagSchema);

export default Tag;
