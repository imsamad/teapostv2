import mongoose, { CallbackWithoutResultAndOptionalError } from "mongoose";
import { TStorySchema } from "shared";
import { MongooseValidationError } from "../lib/mongoose-validation-error";

const storySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    title: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      requried: [true, "Slug is required"],
      unique: true,
    },
    posterImage: String,
    description: {
      type: String,
      trim: true,
    },
    seoKeywords: {
      type: String,
      trim: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },

    isPublishedByAdmin: {
      type: Boolean,
      default: true,
    },

    hadEmailedToFollowers: {
      type: Boolean,
      default: false,
    },

    tags: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Tag",
        },
      ],
    },

    readingTime: {
      type: Number,
      default: 0,
      // required: [true, "It is required and must be non-zero."],
    },

    noOfViews: {
      type: Number,
      default: 0,
    },
    noOfComments: {
      type: Number,
      default: 0,
    },
    noOfLikes: {
      type: Number,
      default: 0,
    },
    noOfDislikes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
      virtuals: true,
    },
  }
);

interface StorySchemaDoc extends TStorySchema, Document {
  isPublished: boolean;
  isPublishedByAdmin: boolean;
  hadEmailedToFollowers: boolean;
}

storySchema.post(
  "save",
  async function postSaveErrorHandler(
    error: any,
    doc: StorySchemaDoc,
    next: CallbackWithoutResultAndOptionalError
  ) {
    next(new MongooseValidationError(error));
  }
);

const Story = mongoose.model<StorySchemaDoc>("Story", storySchema);

export default Story;
