import mongoose from "mongoose";
import { z } from "zod";

export const MongoIdParamsSchema = (paramName: string) =>
  z.object({
    [paramName]: z
      .string({
        required_error: `${paramName} must be valid mongo id`,
      })
      .refine(
        (id) => mongoose.Types.ObjectId.isValid(id),
        `${paramName} must be valid mongo id`
      ),
  });

export const MongoIdStringSchema = z
  .string()
  .refine(
    (id) => id && mongoose.Types.ObjectId.isValid(id),
    "It must be mongoose ids"
  );
export interface GetResponse<T> {
  pagination: {
    next?: number;
    page: number;
    limit: number;
  };
  data: T[];
}
