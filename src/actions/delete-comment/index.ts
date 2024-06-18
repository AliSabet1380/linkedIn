"use server";

import { currentUser } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { connectDB } from "@/DB/db";
import { Post } from "@/DB/postModel";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "../safeAction";
import { DeleteCommentZodSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser();
  if (!user) return { error: " unauthorized" };

  const { postId, commentId } = data;
  try {
    await connectDB();

    const post = await Post.findById(postId).populate({
      path: "comments",
    });
    if (!post) return { error: "post not found" };

    const comment = post.comments?.find((comment) => (comment.id = commentId));
    if (!comment) return { error: "comment not found" };


   // if (comment.user.userId === user.id || post.user.userId === user.id) {
   //   return { error: "you can not delete this commnet" };
 //   } else {
      await post.removeComment(commentId);
 //   }
  } catch (error) {
    console.log(error);
    return { error: "fail to delete comment" };
  }

  revalidatePath("/");
  return { data: {} };
};

export const deleteComment = createSafeAction(DeleteCommentZodSchema, handler);
