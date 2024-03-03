import { Request, Response } from "express";
import Story from "../../models/Story";
import advancePagination from "../../middlewares/advancePagination";

// @desc    My stories/ logged in user's stories
// @route   GET /stories
// @access  Protected
const myStories = async (req: Request, res: Response) => {
  return await advancePagination({
    model: Story,
    extraQuery: {
      isPublished: true,
      isPublishedByAdmin: true,
      author: req.currentUser!.id,
    },
    regExFields: ["title", "description", "seoKeyword"],
  })(req, res);
};

export default myStories;
