require("dotenv").config();
import mongoose from "mongoose";

import dummyTags from "./dummyTags";
import Tag from "../models/Tag";
import User from "../models/User";
import { dummyUsersWithProfile } from "./users";
import { generateStories } from "./storyCreate";
import Story from "../models/Story";
import UserAsset from "../models/UserAsset";
import { dummyAssets } from "./assets";

const create = async () => {
  try {
    await Tag.insertMany(dummyTags);
    const hash = `$2b$10$5iQDqgpAIHAw4Rk.DTnCMeu32wrTOa7EIJvjAvmeFVdSd69we3Fue`;

    await User.insertMany(
      dummyUsersWithProfile().map(({ password, ...rest }) => ({
        ...rest,
        password: hash,
      }))
    );

    await Story.insertMany(await generateStories(1000));
    await UserAsset.insertMany(await dummyAssets(50));
  } catch (err) {
    console.log("err: ");
  } finally {
    console.log("Done");
    process.exit(1);
  }
};

console.log(process.env.argv);

mongoose.connect(process.env.MONGO_URI!).finally(async () => {
  create();
});
