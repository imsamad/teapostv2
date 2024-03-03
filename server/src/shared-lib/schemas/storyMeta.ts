import { z } from "zod";
import { MongoIdStringSchema } from "./main";

export const StoryMetaSchema = z.object({
  id: MongoIdStringSchema,
  likedBy: z.array(MongoIdStringSchema),
  dislikedBy: z.array(MongoIdStringSchema),
});

export type TStoryMetaSchema = z.infer<typeof StoryMetaSchema>;
