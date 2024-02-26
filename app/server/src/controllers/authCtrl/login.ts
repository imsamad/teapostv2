import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import User from "../../models/User";
import { BadRequestError } from "../../lib/bad-request-error";
import { validateRequest } from "../../middlewares/validate-request";
import { LoginSchema } from "shared";
import {
  encodeJwt,
  setAuthCookiesAndReturnResponse,
} from "../../lib/jwt-utils";

// @desc    Login
// @route   POST Log in
// @access  Public

const login = async (req: Request, res: Response) => {
  let { password, identifier } = req.body;

  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }],
    // @ts-ignore
  })
    // @ts-ignore
    .isUserValid()
    .select("+password");

  if (!user) {
    throw new BadRequestError({
      identifier: "Invalid Identifier!",
    });
  }

  if (!(await user.matchPassword(password)))
    throw new BadRequestError({
      password: "Invalid password!",
    });

  return setAuthCookiesAndReturnResponse({ id: user._id, res, user });
};

export default [validateRequest(LoginSchema, "body"), login];
