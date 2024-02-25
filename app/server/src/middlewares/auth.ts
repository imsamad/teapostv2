import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { NotAuthorisedError } from "../lib/not-authorised";

interface UserPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let authSession = req.cookies[process.env.AUTHED_USER_SESSION!];

  console.log("authSession: ", authSession);

  if (!authSession && req.headers.authorization?.startsWith("Bearer "))
    authSession = req.headers.authorization?.split?.(" ")?.[1];

  if (!authSession) return next();

  try {
    const payload = jwt.verify(
      authSession,
      process.env.JWT_KEY!
    ) as UserPayload;

    req.currentUser = payload?.id ? { id: payload.id } : undefined;
  } catch (_) {}
  next();
};

export const requireAuth = (req: Request, _: Response, next: NextFunction) => {
  if (!req.currentUser?.id) throw new NotAuthorisedError();
  next();
};
