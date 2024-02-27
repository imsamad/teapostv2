import { ZodErrorHandler } from "../lib/zod-error";
import { NextFunction, Request, Response } from "express";
import z, { AnyZodObject, ZodEffects } from "zod";

export const validateRequest =
  (schema: AnyZodObject | ZodEffects<any>, on: "body" | "query" | "params") =>
  async (req: Request, _: Response, next: NextFunction) => {
    const res = schema.safeParse(req[on]);
    if (!res.success) {
      throw new ZodErrorHandler(res.error.flatten().fieldErrors);
    }
    return next();
  };
