import { z } from "zod";
import { MongoIdStringSchema } from "./main";

export const AssetSchema = z.object({
  url: z.string().url(),
  tags: z.string(),
});

export const UserAssetSchema = z.object({
  user: MongoIdStringSchema,
  images: z.array(AssetSchema),
  videos: z.array(AssetSchema),
  audios: z.array(AssetSchema),
});

export type TUserAssetSchema = z.infer<typeof UserAssetSchema>;
export type TAssetSchema = z.infer<typeof AssetSchema>;
