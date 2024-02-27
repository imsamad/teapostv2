import { Request, Response } from "express";
import User from "../../models/User";

// @desc    In case client forget its username or email, send back related matching email or username
// @route   GET /api/auth/forgotIdentifier
// @access  Public
const forgotIdentifier = async (req: Request, res: Response) => {
  const identifierInitials = req.params.identifierInitials;

  const users = await User.find({
    $or: [
      { email: new RegExp(identifierInitials, "gi") },
      { username: new RegExp(identifierInitials, "gi") },
    ],
    // @ts-ignore
  }).isUserValid();

  res.json(users.map(({ email, username }: any) => ({ email, username })));
};

export default forgotIdentifier;
