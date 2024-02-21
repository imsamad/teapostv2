import mongoose from "mongoose";

export enum CONFIRMATION_ENUM {
  "REGISTRATION_CONFIRM" = "REGISTRATION_CONFIRM",
  "EMAIL_UPDATE_CONFIRMATION" = "EMAIL_UPDATE_CONFIRMATION",
  "RESET_PASSWORD" = "RESET_PASSWORD",
}

export interface IConfirmationAttrs {
  user: string;
  type: CONFIRMATION_ENUM;
  token: string;
  newEmail: string;
}

// type ConfirmationDoc = mongoose.HydratedDocument<IConfirmationAttrs>;

interface ConfirmationModel extends mongoose.Model<IConfirmationAttrs> {}

const confirmationSchema = new mongoose.Schema<
  IConfirmationAttrs,
  ConfirmationModel
>(
  {
    // @ts-ignore
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "It is requried to mention user"],
    },
    type: {
      type: String,
      enum: CONFIRMATION_ENUM,
    },
    token: String,
    newEmail: String,
  },
  {
    timestamps: true,
  }
);

const Confirmation = mongoose.model<IConfirmationAttrs, ConfirmationModel>(
  "Confirmation",
  confirmationSchema
);

export default Confirmation;
