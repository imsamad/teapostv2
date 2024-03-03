import { Request, Response } from "express";
import { BadRequestError } from "../../lib/bad-request-error";
import UserAsset from "../../models/UserAsset";
import fs from "fs";
import { UPLOAD_DIR_PATH } from "../../config";

// @desc    Delete assets
// @route   DELETE
// @access  Protected
const deleteAsset = async (req: Request, res: Response) => {
  const image = req.body.image,
    audio = req.body.audio,
    video = req.body.video;

  if (!audio && !video && !image)
    throw new BadRequestError({
      message: "Provide what to delete",
    });

  const asset = await UserAsset.findById(req.currentUser!.id);

  if (!asset)
    throw new BadRequestError({
      message: "Asset not found",
    });

  if (asset.videos.length)
    asset.videos = asset?.videos.filter((v: any) => v.url != video);

  if (asset.images.length)
    asset.images = asset?.images.filter((i: any) => i.url != image);

  if (asset.audios.length)
    asset.audios = asset?.audios.filter((a: any) => a.url != audio);

  console.log({ image, video, audio });
  try {
    if (image) fs.unlinkSync(`${UPLOAD_DIR_PATH}/${image}`);
    if (video) fs.unlinkSync(`${UPLOAD_DIR_PATH}/${video}`);
    if (audio) fs.unlinkSync(`${UPLOAD_DIR_PATH}/${audio}`);
  } catch (e) {
    console.log(e);
  } finally {
    return res.json(await asset.save());
  }
};
export default deleteAsset;
