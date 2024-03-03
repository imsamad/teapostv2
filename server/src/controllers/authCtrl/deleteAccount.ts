import { Request, Response } from "express";
import User from "../../models/User";
import UserAsset from "../../models/UserAsset";
import Story from "../../models/Story";
// @desc    Delete account
// @route   DELETE
// @access  Protected
const deleteAccount = async (req: Request, res: Response) => {
  await User.findByIdAndDelete(req.currentUser!.id);
  await UserAsset.findByIdAndDelete(req.currentUser!.id);
  await Story.deleteMany({ author: req.currentUser!.id });
  return res.json({
    message: "Deleted account!",
  });
};
export default deleteAccount;
