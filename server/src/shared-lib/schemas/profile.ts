import { z } from "zod";

import { MongoIdStringSchema } from "./main";

export const ProfileSchema = z.object({
  likeStories: z.array(MongoIdStringSchema),
  dislikeStories: z.array(MongoIdStringSchema),
});

export type TProfileSchema = z.infer<typeof ProfileSchema>;
