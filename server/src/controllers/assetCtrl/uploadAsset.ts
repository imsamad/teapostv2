import { Request, Response } from "express";
import path from "path";
import { BadRequestError } from "../../lib/bad-request-error";
import UserAsset from "../../models/UserAsset";
import { UPLOAD_DIR, UPLOAD_DIR_PATH } from "../../config";
// @desc    Upload asset
// @route   POST
// @access  Protected

const uploadAsset = async (req: Request, res: Response) => {
  const asset: any = req.files!.asset;

  if (!asset || asset?.length > 1 || Object.keys(req.files!).length === 0)
    throw new BadRequestError({
      message: "Provide single image/video or audio on asset",
    });

  // @ts-ignore
  const mimetype = asset.mimetype;

  const MAX_ASSET_SIZE = process.env.MAX_ASSET_SIZE || 10 * 1024 * 1024;

  if (asset.size > MAX_ASSET_SIZE)
    throw new BadRequestError({
      message: `Max ${MAX_ASSET_SIZE} is permissible to upload.`,
    });

  const resource_type = mimetype.includes("video")
    ? "videos"
    : mimetype.includes("image")
    ? "images"
    : mimetype.includes("audio")
    ? "audios"
    : "raw";
  console.log("asset: ", asset);
  // throw new BadRequestError({
  //   message: "Media file not supported!",
  // });

  if (resource_type == "raw")
    throw new BadRequestError({
      message: "Media file not supported!",
    });

  const assetPath = path.parse(asset.name);

  const fileName = assetPath.name.split(" ").join("");

  const postfix = `${resource_type}/${fileName}-${Math.random()
    .toString()
    .slice(3)}${assetPath.ext}`;

  const prefix = `${UPLOAD_DIR_PATH}/${UPLOAD_DIR}`;

  const uploadPath = `${prefix}/${postfix}`;

  await asset.mv(uploadPath);

  const user = req.currentUser!.id;

  res.json(
    await UserAsset.findByIdAndUpdate(
      user,
      {
        _id: user,
        $push: {
          [resource_type]: { url: `${UPLOAD_DIR}/${postfix}`, tag: "" },
        },
      },
      { upsert: true, new: true }
    )
  );
};

export default uploadAsset;
