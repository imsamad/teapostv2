import { Request, Response } from "express";
import Story from "../../models/Story";
import advancePagination from "../../middlewares/advancePagination";

// @desc    Get stories
// @route   GET /stories
// @access  Public

const getStories = async (req: Request, res: Response) => {
  return await advancePagination({
    model: Story,
    extraQuery: {
      isPublished: true,
      isPublishedByAdmin: true,
    },
    regExFields: ["title", "description", "seoKeyword"],
  })(req, res);
};
export default getStories;
