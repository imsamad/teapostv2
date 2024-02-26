import { Request, Response } from "express";
import crypto from "crypto";

import User from "../../models/User";
import Confirmation, { CONFIRMATION_ENUM } from "../../models/Confirmation";
import { sendEmail } from "../../lib/sendEmail";
import { validateRequest } from "../../middlewares/validate-request";
import { UserRegisterSchema } from "shared";

const register = async (req: Request, res: Response) => {
  const user = await User.create({
    ...req.body,
    username:
      req.body.username ||
      `${req.body.fullName.split(" ").join("")}-${Math.random()
        .toString()
        .slice(2)}`,
    isVerified: process.env.NODE_ENV != "production",
  });

  const token = crypto.randomBytes(20).toString("hex");

  const hashedVerifyToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  await Confirmation.create({
    user: user._id.toString(),
    type: CONFIRMATION_ENUM["REGISTRATION_CONFIRM"],
    token: hashedVerifyToken,
  });

  const redirectUrl = `${process.env.CLIENT_API}/auth/confirm/registration/${token}`;

  const resObj: any = {
    message: "Confirmation email sent!",
  };

  await sendEmail();

  if (process.env.NODE_ENV == "development") {
    resObj.redirectUrl = redirectUrl;
  }

  res.status(200).json(resObj);
};

export default [validateRequest(UserRegisterSchema, "body"), register];
// export default register;
