import { Response } from "express";
import jwt from "jsonwebtoken";
import Profile from "../models/Profile";

export const encodeJwt = (data: any) => {
  return jwt.sign(data, process.env.JWT_KEY!);
};

export const setAuthCookiesAndReturnResponse = async ({
  id,
  res,
  user,
}: {
  id: string;
  res: Response;
  user: any;
}) => {
  const session = encodeJwt({ id, role: user.role });

  res.cookie(process.env.AUTHED_USER_SESSION!, session, {
    maxAge: Date.now() + 60 * 60 * 1000,
    secure: process.env.NODE_ENV == "production",
    httpOnly: true,
    sameSite: "strict",
  });

  return res.json({
    user,
    session,
    profile: await Profile.findByIdAndUpdate(
      id,
      {},
      { new: true, upsert: true }
    ),
  });
};

export const decodeJwt = () => {};
