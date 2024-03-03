import mongoose from "mongoose";

import { z } from "zod";
import { MongoIdStringSchema } from "./main";

export const StorySchema = z.object({
  id: MongoIdStringSchema,
  title: z
    .string({
      required_error: "Title is required",
    })
    .trim(),
  subtitle: z
    .string({
      required_error: "Title is required",
    })
    .trim(),
  description: z
    .string({
      required_error: "Description is required",
    })
    .trim(),
  slug: z.string({ required_error: "Slug is required" }).trim(),

  posterImage: z.string().url().trim(),

  author: MongoIdStringSchema,

  seoKeywords: z
    .string({
      required_error: "Keywords are required, for SEO-purpose!",
    })
    .trim(),

  tags: z.array(MongoIdStringSchema),

  // Field to be set run-time
  readingTime: z.number().nonnegative(),
  isPublished: z.boolean(),
  isPublishedByAdmin: z.boolean(),
  hadEmailedToFollowers: z.boolean(),
  noOfViews: z.number().nonnegative(),
  noOfComments: z.number().nonnegative(),
  noOfLikes: z.number().nonnegative(),
  noOfDislikes: z.number().nonnegative(),
});

export type TStorySchema = z.infer<typeof StorySchema>;

export const LooseStorySchema = (slugRequired: boolean) =>
  StorySchema.pick({
    title: true,
    description: true,
    posterImage: true,
    seoKeywords: true,
    tags: true,
    id: true,
  })
    .partial()
    .merge(StorySchema.pick(slugRequired ? { slug: true } : {}));

export type TLooseStorySchema = z.infer<ReturnType<typeof LooseStorySchema>>;

export const MongoIdsArray = (params: string) =>
  z.object({
    [params]: z
      .string()
      .array()
      .refine(
        (ids) => ids.every((id) => mongoose.Types.ObjectId.isValid(id)),
        "Each must be mongoose ids"
      ),
  });
