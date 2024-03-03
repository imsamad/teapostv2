import { getRndInteger } from "../lib/utils";
import User from "../models/User";
import { titleImages } from "./cloudinaryDummyPics";

const dummyAssets = async (maxNoOfAssets: number) => {
  const dummyUsersIds = (await User.find()).map(({ _id }) => _id);

  const assets = dummyUsersIds.map((user) => ({
    _id: user,
    images: titleImages
      .sort(() => Math.random() - Math.random())
      .slice(
        0,
        getRndInteger(
          10,
          maxNoOfAssets || Math.floor(titleImages.length * 0.75)
        )
      )
      .map((image) => ({ url: image.secure_url })),
  }));

  return assets;
};

export { dummyAssets };
