import { Request, Response } from "express";
import crypto from "crypto";
import z from "zod";
import Confirmation, { CONFIRMATION_ENUM } from "../../models/Confirmation";
import { sendEmail } from "../../lib/sendEmail";
import { validateRequest } from "../../middlewares/validate-request";

const payloadSchema = z.object({
  newEmail: z
    .string({
      required_error: "Email is required",
    })
    .email(),
});

// @desc    Change email, which would require confirmation
// @route   POST /api/v1/auth/changeEmail
// @access  Protected
const changeEmail = async (req: Request, res: Response) => {
  const user = req.currentUser?.id!;
  const newEmail = req.body.newEmail;
  const token = crypto.randomBytes(20).toString("hex");

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  await Confirmation.create({
    user: user.toString(),
    type: CONFIRMATION_ENUM["EMAIL_UPDATE_CONFIRMATION"],
    token: hashedToken,
    newEmail,
  });

  const redirectUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/confirm/changeEmail/${token}`;

  const resObj: any = {
    message: "Confirmation email sent!",
  };

  await sendEmail();

  if (process.env.NODE_ENV == "development") {
    resObj.redirectUrl = redirectUrl;
  }

  res.status(200).json(resObj);
};
export default [validateRequest(payloadSchema, "body"), changeEmail];
