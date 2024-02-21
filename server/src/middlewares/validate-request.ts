import { ZodErrorHandler } from "../lib/zod-error";
import { NextFunction, Request, Response } from "express";
import z, { AnyZodObject } from "zod";

export const validateRequest =
  (schema: AnyZodObject, on: "body" | "query" | "params") =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let tmpSchema: AnyZodObject = z.object({
        [on]: schema,
      });

      await tmpSchema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err: any) {
      throw new ZodErrorHandler(err.format()[on]);
    }
  };
