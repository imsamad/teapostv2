import { Request, Response } from "express";
import Tag from "../../models/Tag";
import advancePagination from "../../middlewares/advancePagination";

// @desc    Get all tags
// @route   GET /tags
// @access  Public
const getTags = async (req: Request, res: Response) => {
  return await advancePagination({
    model: Tag,
    regExFields: ["title"],
  })(req, res);
};

export default getTags;
