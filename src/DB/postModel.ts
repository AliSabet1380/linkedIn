import { IUser } from "@/types/types";
import mongoose, { Schema, Document, models, Model, ObjectId } from "mongoose";
import {
  Comment,
  IComment,
  ICommentBase,
  ICommentDocument,
} from "./commentModel";

interface IPostBase {
  user: IUser;
  text: string;
  imageUrl?: string;
  comments?: ICommentDocument[];
  likes?: string[];
}
export interface IPost extends IPostBase, Document {
  createdAt: Date;
  updatedAt: Date;
}

interface IPostMethods {
  likePost: (userId: string) => Promise<void>;
  unlikePost: (userId: string) => Promise<void>;
  commentOnPost: (comment: ICommentBase) => Promise<void>;
  getAllComments: () => Promise<IComment[]>;
  removePost: () => Promise<void>;
  removeComment: (commentId: string) => Promise<void>;
}
interface IPostStatics {
  getAllPosts: () => Promise<IPostDocument[]>;
}

export interface IPostDocument extends IPostMethods, IPost {}
interface IPostModel extends IPostStatics, Model<IPostDocument> {}

const postSchema = new Schema<IPostDocument>(
  {
    user: {
      userId: { type: String, required: true },
      userImage: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String },
    },
    text: {
      type: String,
      required: true,
    },
    imageUrl: String,
    comments: {
      type: [mongoose.Types.ObjectId],
      ref: "Comment",
      default: [],
    },
    likes: {
      type: [String],
    },
  },
  { timestamps: true }
);

// Methods
postSchema.methods.likePost = async function (userId: string) {
  try {
    await this.updateOne({
      $addToSet: {
        likes: userId,
      },
    });
  } catch (error) {
    console.log(error);
    // throw new Error("fail to like post");
  }
};

postSchema.methods.unlikePost = async function (userId: string) {
  try {
    await this.updateOne({
      $pull: {
        likes: userId,
      },
    });
  } catch (error) {
    throw new Error("fail to unlike post");
  }
};

postSchema.methods.removePost = async function () {
  try {
    await this.model("Post").deleteOne({ _id: this._id });
  } catch (error) {
    throw new Error("fail to remove post");
  }
};

postSchema.methods.commentOnPost = async function (comment: ICommentBase) {
  try {
    const newComment = await Comment.create(comment);
    if (!newComment) throw new Error("fail to commnet");
    this.comments.push(newComment._id);
    await this.save();
  } catch (error) {
    console.log(error);
    throw new Error("fail to comment");
  }
};

postSchema.methods.getAllComments = async function () {
  try {
    await this.populate({
      path: "comments",
      options: { sort: { createdAt: -1 } },
    });
    return this.comments;
  } catch (error) {
    console.log(error);
    throw new Error("fail to fetch comments");
  }
};

postSchema.methods.removeComment = async function (commentId: string) {
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) throw new Error("fail to delete commnet");

    await this.updateOne({
      $pull: {
        comments: new mongoose.Types.ObjectId(commentId),
      },
    });
  } catch (error) {
    console.log(error);
  }
};

postSchema.statics.getAllPosts = async function () {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "comments",
        options: { sort: { createdAt: -1 } },
      })
      .lean();

    return posts.map((post: IPostDocument) => ({
      ...post,
      _id: (post._id as ObjectId).toString(),
      comments: post.comments?.map((commnet: IComment) => ({
        ...commnet,
        _id: (commnet._id as ObjectId).toString(),
      })),
    }));
  } catch (error) {
    console.log(error);
  }
};

export const Post =
  (models.Post as IPostModel) ||
  mongoose.model<IPostDocument, IPostModel>("Post", postSchema);
