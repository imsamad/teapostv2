import mongoose from "mongoose";
import { z } from "zod";

export const storySchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(10, "Title is required!"),
  slug: z
    .string({
      required_error: "Required",
    })
    .min(5, "Slug is required!"),
  posterImage: z.string().url(),
  author: z.string({ required_error: "Author is required!" }),

  description: z.string().min(200, "Description is required"),
  seoKeywords: z.string().min(20, "Keywords are required, for SEO-purpose!"),
  tags: z
    .string()
    .refine(
      (d) => d && mongoose.Types.ObjectId.isValid(d),
      "Tag must be valid object id"
    )
    .or(
      z.object({
        title: z.string(),
        id: z.string(),
      })
    )
    .array(),
  readingTime: z
    .number()
    .nonnegative()
    .min(5, "Reading Time must greater or equal to 5!"),
});

export const LooseStorySchema = z.object({
  title: z.string().optional(),

  slug: z.string({
    required_error: "Slug is required!",
  }),

  posterImage: z.string().url().optional(),

  author: z.string().optional(),

  description: z.string().optional(),

  seoKeywords: z.string().optional(),

  tags: z
    .string()
    .refine(
      (d) => d && mongoose.Types.ObjectId.isValid(d),
      "Tag must be valid object id"
    )
    .or(
      z.object({
        title: z.string(),
        id: z.string(),
      })
    )
    .array()
    .optional(),

  readingTime: z.number().optional(),
});
export type TStorySchema = z.infer<typeof storySchema>;
