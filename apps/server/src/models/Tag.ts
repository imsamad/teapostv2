import mongoose from "mongoose";

interface Tag {
  title: string;
  id: string;
}

interface TagDoc extends Omit<Tag, "id">, mongoose.Document {}

const tagSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc: any, ret: any) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
      },
      virtuals: true,
    },
  }
);

const Tag = mongoose.model<TagDoc>("Tag", tagSchema);

export default Tag;
