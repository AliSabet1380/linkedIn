"use server";

import { currentUser } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { connectDB } from "@/DB/db";
import { Post } from "@/DB/postModel";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "../safeAction";
import { LikePostZodSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser();
  if (!user) return { error: "unauthorized" };

  const { postId } = data;

  try {
    await connectDB();

    const post = await Post.findById(postId);
    if (!post) return { error: "post not found" };

    if (user.id && post.likes?.includes(user.id)) {
      await post.unlikePost(user.id);
    } else {
      await post.likePost(user.id);
    }
  } catch (error) {
    return { error: "fail to like post" };
  }

  revalidatePath("/");
  return { data: {} };
};

export const likePost = createSafeAction(LikePostZodSchema, handler);
