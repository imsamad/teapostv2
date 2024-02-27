import crypto from "crypto";
import { Request, Response } from "express";
import Confirmation, { CONFIRMATION_ENUM } from "../../models/Confirmation";
import { BadRequestError } from "../../lib/bad-request-error";
import User from "../../models/User";
// @desc    Confirm the new Emailuser wish to change to.
// @route   PUT /api/auth/confirm/changeEmail/:token
// @access  Public

const confirmChangedEmail = async (req: Request, res: Response) => {
  const token = req.params.token;

  const hashedVerifyToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const confirmation = await Confirmation.findOne({
    token: hashedVerifyToken,
    type: CONFIRMATION_ENUM["EMAIL_UPDATE_CONFIRMATION"],
  });

  if (!confirmation) throw new BadRequestError("Token expired, try again!");

  const user = await User.findById(confirmation.user);

  if (!user) throw new BadRequestError("Invalid operation!");

  user.isVerified = true;
  user.email = confirmation.newEmail;
  await user.save();
  await confirmation.deleteOne();
  res.json({
    message: "Confirmed successfully, log in from website!",
  });
};

export default confirmChangedEmail;
