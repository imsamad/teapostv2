import { Request, Response } from "express";
import User from "../../models/User";
// @desc    Update Profile
// @route   PUT /auth/update`
// @access  Protected
const updateProfile = async (req: Request, res: Response) => {
  const { fullName, username } = req.body;
  const user = await User.findById(req.currentUser!.id);

  user!.fullName = fullName || user?.fullName;
  user!.username = username || user?.username;

  return res.json(await user!.save());
};

export default updateProfile;
