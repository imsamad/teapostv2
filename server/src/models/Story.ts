import mongoose, {
  CallbackWithoutResultAndOptionalError,
  Document,
  HydratedDocument,
  Model,
  QueryWithHelpers,
} from "mongoose";

import { MongooseValidationError } from "../lib/mongoose-validation-error";
import User from "./User";
import { BadRequestError } from "../lib/bad-request-error";
import { TStorySchema } from "../shared-lib";

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
    subtitle: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
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
          // @ts-ignore
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
      virtuals: true,
    },
  }
);
interface StorySchemaDoc extends TStorySchema {}

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

storySchema.pre(
  // @ts-ignore
  "save",
  async function (next: CallbackWithoutResultAndOptionalError) {
    // @ts-ignore
    this.tags = [...new Set(this.tags.map((t) => t.toString()))];

    // @ts-ignore
    if (!this.isNew) return next();
    // @ts-ignore
    const author = await User.findById(this.author);
    if (!author)
      return new BadRequestError({
        message: "Not authorised",
      });

    // @ts-ignore
    author.stories = author.stories + 1;
    await author.save();
    next();
  }
);

storySchema.pre("deleteOne", { document: true }, async function (next) {
  // @ts-ignore
  await User.findByIdAndUpdate(this.author, {
    $inc: { stories: -1 },
  });
  next();
});

const Story = mongoose.model<StorySchemaDoc>("Story", storySchema);

export default Story;
