import { Request, Response } from "express";
import Confirmation, { CONFIRMATION_ENUM } from "../../models/Confirmation";
import crypto from "crypto";
import { BadRequestError } from "../../lib/bad-request-error";
import User from "../../models/User";
import Profile from "../../models/Profile";

// import { setAuthCookiesAndReturnResponse } from "../../lib/jwt-utils";

// @desc    Confirm registration
// @route   GET /auth/confirmation/:token
// @access  Public
const confirmRegistration = async (req: Request, res: Response) => {
  const token = req.params.token;

  const hashedVerifyToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const confirmation = await Confirmation.findOne({
    token: hashedVerifyToken,
    type: CONFIRMATION_ENUM["REGISTRATION_CONFIRM"],
  });

  if (!confirmation) throw new BadRequestError("Token expired, try again!");

  const user = await User.findById(confirmation.user);

  if (!user) throw new BadRequestError("Invalid operation!");

  user.isVerified = true;
  await user.save();
  await confirmation.deleteOne();
  await Profile.create({ _id: user._id });
  res.json({
    message: "Confirmed successfully!",
  });
  // return setAuthCookiesAndReturnResponse({
  //   id: user._id.toString(),
  //   res,
  //   user,
  // });
};

export default confirmRegistration;
