import { Request, Response, NextFunction } from "express";
import { NotAuthorisedError } from "../lib/not-authorised";

export const requireAuthError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) throw new NotAuthorisedError();
  next();
};
