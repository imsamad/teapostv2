import mongoose from "mongoose";

import { TProfileSchema } from "../shared-lib/schemas/profile";

const profileSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: [true, "User is required."],
    ref: "User",
  },

  likeStories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Story",
    },
  ],
  dislikeStories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Story",
    },
  ],
});

const Profile = mongoose.model<TProfileSchema>("Profile", profileSchema);

export default Profile;
