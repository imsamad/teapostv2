import { NextFunction, Request, Response } from "express";
// @desc
// @route   GET
// @access  Public

const ctrl1 = async (req: Request, res: Response, next: NextFunction) => {
  console.log("req: ", req.body);
  req.currentUser = { id: "jksdncjk", isAdmin: true };
  res.redirect("/api/v1/auth/ctrl2");
};

export default ctrl1;
