import { Request, Response } from "express";
import User from "../../models/User";
import { BadRequestError } from "../../lib/bad-request-error";

// @desc    Change password
// @route   PUT /auth/changepassword
// @access  Protected
const changePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.currentUser!.id).select("+password");
  // @ts-ignore
  if (user && !(await user.matchPassword(oldPassword)))
    throw new BadRequestError({
      password: "Invalid password!",
    });

  user!.password = newPassword;

  res.json(await user!.save());
};

export default changePassword;
