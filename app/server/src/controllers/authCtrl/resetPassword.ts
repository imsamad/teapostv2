import { validateRequest } from "../../middlewares/validate-request";
import { Request, Response } from "express";
import crypto from "crypto";
import z from "zod";

import Confirmation from "../../models/Confirmation";
import { BadRequestError } from "../../lib/bad-request-error";
import User from "../../models/User";

const payloadSchema = z.object({
  password: z.string({
    required_error: "Password is required",
  }),
  confirmPassword: z.string({
    required_error: "Password is required",
  }),
});

// @desc    Reset password
// @route   POST /api/auth/resetPassword
// @access  Public

const resetPassword = async (req: Request, res: Response) => {
  if (req.body.password != req.body.confirmPassword)
    throw new BadRequestError("Password must be same!");

  const token = req.params.token;

  const hashedVerifyToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const confirmation = await Confirmation.findOne({
    token: hashedVerifyToken,
  });

  if (!confirmation) throw new BadRequestError("Invalid request");

  // @ts-ignore
  let createdAt = new Date(confirmation.createdAt).getTime();
  const now = new Date().getTime();

  const tenMinutesMS =
    Number(process.env.RESET_LINK_EXPIRE_minutes!) * 60 * 1000;

  let isExpired = now - createdAt > tenMinutesMS;

  if (isExpired) {
    await confirmation.deleteOne();
    throw new BadRequestError("Link expired");
  }

  const user = await User.findById(confirmation.user);

  if (!user) {
    await confirmation.deleteOne();
    throw new BadRequestError("Invalid request");
  }
  user.password = req.body.password;
  await user.save();
  await confirmation.deleteOne();

  res.json({
    message: "Password reseted successsully!",
  });
};

export default [validateRequest(payloadSchema, "body"), resetPassword];
