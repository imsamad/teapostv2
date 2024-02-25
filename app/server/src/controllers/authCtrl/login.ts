import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import z from "zod";
import User from "../../models/User";
import { BadRequestError } from "../../lib/bad-request-error";
import { validateRequest } from "../../middlewares/validate-request";

const payloadSchema = z.object({
  identifier: z.string({
    required_error: "Identifier is required, either email or username.",
  }),
  password: z.string({
    required_error: "Password is required.",
  }),
});

// @desc    Login
// @route   POST Log in
// @access  Public

const login = async (req: Request, res: Response) => {
  const { password, identifier } = req.body;

  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }],
    // @ts-ignore
  })
    // @ts-ignore
    .isUserValid()
    .select("+password");

  if (!user || !(await user.matchPassword(password)))
    throw new BadRequestError("Provide valid credentials!");

  const userJwt = jwt.sign(
    {
      id: user._id,
      now: Date.now(),
    },
    process.env.JWT_KEY!
  );

  res.cookie(process.env.AUTHED_USER_SESSION!, userJwt, {
    maxAge: Date.now() + 5 * 60 * 1000,
    secure: process.env.NODE_ENV == "production",
    httpOnly: true,
    sameSite: "strict",
  });

  return res.json({ user, session: userJwt });
};

export default [validateRequest(payloadSchema, "body"), login];
