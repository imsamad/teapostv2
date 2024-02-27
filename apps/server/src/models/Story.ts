import mongoose, { CallbackWithoutResultAndOptionalError } from "mongoose";
import { TStorySchema } from "shared";
import { MongooseValidationError } from "../lib/mongoose-validation-error";
import User from "./User";
import { BadRequestError } from "../lib/bad-request-error";

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

interface StorySchemaDoc extends TStorySchema, mongoose.Document {
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

storySchema.pre(
  // @ts-ignore
  "save",
  async function (next: CallbackWithoutResultAndOptionalError) {
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

// @ts-ignore
storySchema.pre("remove", async function (next) {
  // @ts-ignore
  await User.findByIdAndUpdate(this.author, {
    $inc: { stories: -1 },
  });
});

storySchema.pre("deleteOne", { document: true }, async function (next) {
  // @ts-ignore
  await User.findByIdAndUpdate(this.author, {
    $inc: { stories: -1 },
  });
  next();
});

const Story = mongoose.model<StorySchemaDoc>("Story", storySchema);

export default Story;
