import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { NotAuthorisedError } from "../lib/not-authorised";

interface UserPayload {
  id: string;
  isAdmin: boolean;
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

  if (!authSession && req.headers.authorization?.startsWith("Bearer "))
    authSession = req.headers.authorization?.split?.(" ")?.[1];

  if (!authSession) return next();

  try {
    const payload: any = jwt.verify(authSession, process.env.JWT_KEY!);

    req.currentUser = payload?.id
      ? { id: payload.id, isAdmin: payload.role == "admin" }
      : undefined;
  } catch (_) {}
  next();
};

export const requireAuth = (req: Request, _: Response, next: NextFunction) => {
  if (!req.currentUser?.id) throw new NotAuthorisedError();
  next();
};

export const requireAdmin = (req: Request, _: Response, next: NextFunction) => {
  if (!req.currentUser?.id || !req.currentUser.isAdmin)
    throw new NotAuthorisedError();
  next();
};
