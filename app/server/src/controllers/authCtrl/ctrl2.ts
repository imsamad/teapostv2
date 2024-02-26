import { Request, Response } from "express";
// @desc
// @route   GET
// @access  Public

const ctrl2 = async (req: Request, res: Response) => {
  // res.redirect("/ctrl2");

  res.json({
    // @ts-ignore
    isRedirected: req.currentUser,
    msg: req.body,
  });
};
export default ctrl2;
