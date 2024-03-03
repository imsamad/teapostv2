import { z } from "zod";
import { MongoIdStringSchema } from "./main";

export const CommentSchema = z.object({
  id: MongoIdStringSchema,
  by: MongoIdStringSchema,
  title: z.string({
    required_error: "Title is required!",
  }),
  parentStory: MongoIdStringSchema.optional(),
  parentComment: MongoIdStringSchema.optional(),
});

export type TCommentSchema = z.infer<typeof CommentSchema>;
