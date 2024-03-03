import { z } from "zod";
import { MongoIdStringSchema } from "./main";

export const TagSchema = z.object({
  title: z.string().min(3),
  id: MongoIdStringSchema,
});
