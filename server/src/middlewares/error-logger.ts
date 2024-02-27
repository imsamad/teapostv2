import { NextFunction, Request, Response } from "express";
import { CustomError } from "../lib/custom-error";

export const errorLogger = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log("Error from Error-logger:");
  if (err instanceof CustomError) console.error(err.serializeErrors());
  else console.error(err);
  _next(err);
};
