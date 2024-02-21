import { NextFunction, Request, Response } from "express";

import { CustomError } from "../lib/custom-error";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  }

  res.status(500).json({
    errors: [{ message: "Something went wrong!" }],
  });
};
