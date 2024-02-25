import { Request, Response } from "express";
import z from "zod";
import crypto from "crypto";
import { BadRequestError } from "../../lib/bad-request-error";
import { validateRequest } from "../../middlewares/validate-request";
import Confirmation, { CONFIRMATION_ENUM } from "../../models/Confirmation";
import User from "../../models/User";
import { sendEmail } from "../../lib/sendEmail";

const payloadSchema = z.object({
  email: z
    .string({
      required_error: "Valid email is required.",
    })
    .email("Provide valid email."),
});

// @desc    Forgot Password, create and email the token.
// @route   POST /auth/forgotPassword
// @access  Public
const forgotPassword = async (req: Request, res: Response) => {
  const email = req.body.email;

  const user = await User.findOne({
    email,
  })
    // @ts-ignore
    .isUserValid();

  if (!user) throw new BadRequestError("Invalid request");

  await Confirmation.deleteMany({
    user: user._id.toString(),
    type: CONFIRMATION_ENUM["RESET_PASSWORD"],
  });

  const token = crypto.randomBytes(20).toString("hex");

  const hashedVerifyToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  await Confirmation.create({
    user: user._id.toString(),
    type: CONFIRMATION_ENUM["RESET_PASSWORD"],
    token: hashedVerifyToken,
  });

  const redirectUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/confirm/resetPassword/${token}`;

  const resObj: any = {
    message: "Reset password link has been emailed!",
  };

  await sendEmail();

  if (process.env.NODE_ENV == "development") {
    resObj.redirectUrl = redirectUrl;
  }

  res.status(200).json(resObj);
};

export default [validateRequest(payloadSchema, "body"), forgotPassword];
