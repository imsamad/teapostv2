require("dotenv").config();
import mongoose from "mongoose";

import Tag from "../models/Tag";
import User from "../models/User";
import Story from "../models/Story";
import UserAsset from "../models/UserAsset";

const purge = async () => {
  try {
    await Tag.deleteMany();

    await User.deleteMany();

    await Story.deleteMany();
    await UserAsset.deleteMany();
  } catch (err) {
    console.log("err: ");
  } finally {
    console.log("Done");
    process.exit(1);
  }
};

console.log(process.env.argv);

mongoose.connect(process.env.MONGO_URI!).finally(async () => {
  purge();
});
