import { IUser } from "@/types/types";
import mongoose, { Schema, Document, Model, models } from "mongoose";

export interface ICommentBase {
  user: IUser;
  text: string;
}

export interface IComment extends Document, ICommentBase {
  createdAt: Date;
  updatedAt: Date;
}

interface ICommentMethods {}
interface ICommentStatics {}

export interface ICommentDocument extends IComment, ICommentMethods {}
interface ICommentModel extends ICommentStatics, Model<ICommentDocument> {}

const commentSchema = new Schema<ICommentDocument>(
  {
    text: {
      type: String,
      required: true,
    },
    user: {
      userId: { type: String, required: true },
      userImage: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String },
    },
  },
  { timestamps: true }
);

export const Comment =
  (models.Comment as ICommentModel) ||
  mongoose.model<ICommentDocument, ICommentModel>("Comment", commentSchema);
