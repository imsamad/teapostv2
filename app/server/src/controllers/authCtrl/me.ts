import { Request, Response } from "express";
import User from "../../models/User";
// @desc    My info
// @route   GET
// @access  Public
const me = async (req: Request, res: Response) => {
  const user = await User.findById(req.currentUser!.id);
  res.json(user);
};

export default me;
