import mongoose, {
  CallbackWithoutResultAndOptionalError,
  Document,
} from "mongoose";
import { TUserAssetSchema } from "../shared-lib";
import { MongooseValidationError } from "../lib/mongoose-validation-error";

const assetSchmea = {
  url: {
    type: String,
    required: [true, "Asset url is  required"],
  },
  tags: {
    type: String,
    // required: [true, "Attching tag is required to boost UX"],
  },
};

const userAssetSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Required to mention user"],
    },
    videos: [assetSchmea],
    audios: [assetSchmea],
    images: [assetSchmea],
  },
  {
    toJSON: {
      transform: function (_doc: any, _ret: any) {
        _ret.id = _ret._id.toString();
        delete _ret._id;
        delete _ret.__v;
      },
      virtuals: true,
    },
  }
);

interface UserAssetDoc extends TUserAssetSchema, Document {}

userAssetSchema.post(
  "save",
  async function postSaveErrorHandler(
    error: any,
    doc: UserAssetDoc,
    next: CallbackWithoutResultAndOptionalError
  ) {
    next(new MongooseValidationError(error));
  }
);

const UserAsset = mongoose.model<UserAssetDoc>("Asset", userAssetSchema);

export default UserAsset;
