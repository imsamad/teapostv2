import { Request, Response } from "express";
import UserAsset from "../../models/UserAsset";

// @desc    Get assets
// @route   GET
// @access  Protected
const getAssets = async (req: Request, res: Response) => {
  res.json(await UserAsset.findById(req.currentUser!.id));
};

export default getAssets;
