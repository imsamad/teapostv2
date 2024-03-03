import mongoose, {
  CallbackWithoutResultAndOptionalError,
  QueryWithHelpers,
} from "mongoose";
import * as bcrypt from "bcrypt";

import { MongooseValidationError } from "../lib/mongoose-validation-error";

export interface IUser {
  email: string;
  username: string;
  fullName: string;
  password: string;
  isVerified: boolean;
  isBlocked: boolean;
  role: "user" | "admin";
  profilePic?: string;
}

interface IUserStaticMeth {
  matchPassword(_pwd: IUser["password"]): Promise<boolean>;
}

interface UserQueryHelper {
  isUserValid(): QueryWithHelpers<UserDoc[], UserDoc, UserQueryHelper>;
}

type UserModel = mongoose.Model<IUser, UserQueryHelper, IUserStaticMeth>;

type UserDoc = mongoose.HydratedDocument<IUser, {}, UserQueryHelper>;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is compulsory."],
      unique: true,
      // match: [
      //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      //   "Please add a valid email",
      // ],
    },
    profilePic: {
      type: String,
    },
    username: {
      type: String,
      required: [true, "Username is compulsory."],
      unique: true,
      minlength: [4, "Username's minimum length must be 4."],
    },
    fullName: {
      type: String,
      required: [true, "Username is compulsory."],
    },
    password: {
      type: String,
      required: [true, "Password is compulsory."],
      minlength: [8, "Password's minimum length must be 8."],
      maxlength: [64, "Password's maximum length must be 64."],
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },

    stories: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc: any, ret: any) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret.password;
        delete ret._id;
      },
      virtuals: true,
    },
  }
);

userSchema.method(
  "matchPassword",
  async function (enterPassword: IUser["password"]) {
    return await bcrypt.compare(enterPassword, this.password);
  }
);

userSchema.pre("save", async function (next) {
  const user = this as unknown as UserDoc;

  if (!user.isModified("password")) {
    return next();
  }

  const saltFactor = Number(process.env.SALT_FACTOR) || 10;

  try {
    const salt = await bcrypt.genSalt(saltFactor);
    user.password = bcrypt.hashSync(user.password, salt);
  } catch (err) {
    throw new Error("Can notprocess");
  }
  next();
});

userSchema.post(
  "save",
  async function postSaveErrorHandler(
    error: any,
    doc: UserDoc,
    next: CallbackWithoutResultAndOptionalError
  ) {
    next(new MongooseValidationError(error));
  }
);

// @ts-ignore
userSchema.query.isUserValid = function () {
  let docs = this as any;
  return docs.where({ isVerified: true, isBlocked: false });
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
