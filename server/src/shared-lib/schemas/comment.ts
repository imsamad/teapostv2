import { z } from 'zod';
import { MongoIdStringSchema } from './main';

export const CommentSchema = z.object({
  // id: MongoIdStringSchema,
  user: MongoIdStringSchema,
  title: z.string({
    required_error: 'Title is required!',
  }),
  parentStory: MongoIdStringSchema.optional(),
  parentComment: MongoIdStringSchema.optional(),
});

export const LooseCommentSchema = CommentSchema.pick({
  title: true,
  parentStory: true,
  parentComment: true,
}).partial({ parentComment: true, parentStory: true });

export type TCommentSchema = z.infer<typeof CommentSchema>;
