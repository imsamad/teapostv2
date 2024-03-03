import { Request, Response } from "express";
import { Model } from "mongoose";

const advancePagination =
  ({
    extraQuery,
    model,
    regExFields,
  }: {
    model: Model<any>;
    extraQuery?: Object;
    regExFields?: string[];
  }) =>
  async (req: Request, res: Response) => {
    const reqQuery = { ...req.query, ...extraQuery };
    const removeFields = ["select", "page", "limit", "q", "populate"];

    // @ts-ignore
    removeFields.forEach((param) => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    let queryParse: any = JSON.parse(queryStr);

    if (typeof req.query.q == "string")
      regExFields?.forEach((qF) => {
        queryParse.$or = queryParse.$or || [];
        queryParse.$or.push({
          [qF]: new RegExp(`${req.query.q}`, "gi"),
        });
      });
    console.log("queryParse: ", queryParse);
    // @ts-ignore
    let query: any = model.find(queryParse);

    // @ts-ignore
    const totalDocs = await model.countDocuments(queryParse);

    if (req.query.select) {
      // @ts-ignore
      const fields = req.query.select!.split(",").join(" ");
      query.select(fields);
    }

    if (req.query.sort) {
      // @ts-ignore
      const fields = req.query.sort!.split(",").join(" ");
      query.sort(fields);
    } else {
      query.sort("-createdAt");
    }

    if (req.query.populate) {
      // @ts-ignore
      const fields = req.query.populate!.split(",").join(" ");
      query.populate(fields);
    }
    //   @ts-ignore
    const page = parseInt(req.query.page, 10) || 1;
    //   @ts-ignore
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    console.log({ startIndex, endIndex });
    query.skip(startIndex).limit(limit);

    let pagination: any = { page, totalDocs, limit };
    if (endIndex < totalDocs) pagination.next = page + 1;

    res.json({
      pagination,
      data: await query,
    });
  };

export default advancePagination;
