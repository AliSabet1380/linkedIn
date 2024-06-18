"use server";

import { currentUser } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { connectDB } from "@/DB/db";

import { revalidatePath } from "next/cache";
import { Post } from "@/DB/postModel";
import { createSafeAction } from "../safeAction";
import { CommentOnPostZodSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser();
  if (!user) return { error: "unauhtorized" };

  const { postId, text } = data;

  try {
    await connectDB();

    const post = await Post.findById(postId);
    if (!post) return { error: "post not found" };

    await post.commentOnPost({
      user: {
        userId: user.id,
        userImage: user.imageUrl,
        firstName: user.firstName || "John",
        lastName: user.lastName || "Deo",
      },
      text,
    });
  } catch (error) {
    return { error: "fail to commnet" };
  }

  revalidatePath("/");
  return { data: {} };
};

export const commentOnPost = createSafeAction(CommentOnPostZodSchema, handler);
