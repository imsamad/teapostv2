import mongoose from "mongoose";

import { TStoryMetaSchema } from "../shared-lib/schemas/storyMeta";

const storyMetaSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      ref: "Story",
    },
    likedBy: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikedBy: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      transform: function (_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
      virtuals: true,
    },
  }
);

const StoryMeta = mongoose.model<TStoryMetaSchema>(
  "StoryMeta",
  storyMetaSchema
);

export default StoryMeta;
