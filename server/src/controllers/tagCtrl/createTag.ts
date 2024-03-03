import { Request, Response } from "express";
import { validateRequest } from "../../middlewares/validate-request";
import { TagSchema } from "../../shared-lib/schemas/tag";
import Tag from "../../models/Tag";
// @desc    Create tag
// @route   POST /tags
// @access  Admin

const createTag = async (req: Request, res: Response) => {
  res.json(await Tag.create(req.body));
};

export default [
  validateRequest(TagSchema.pick({ title: true }), "body"),
  createTag,
];
