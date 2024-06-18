"use server";
import { currentUser } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { connectDB } from "@/DB/db";
import { Post } from "@/DB/postModel";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "../safeAction";
import { DeletePostZodSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser();
  if (!user) return { error: "unauthorized" };

  const { postId } = data;

  let post;
  try {
    await connectDB();

    post = await Post.findById(postId);

    if (post?.user.userId !== user.id)
      return { error: "you can only delete your own post" };

    await post.removePost();
  } catch (error) {
    return { error: "fail to delete post" };
  }

  revalidatePath("/");
  return { data: {} };
};

export const deletePost = createSafeAction(DeletePostZodSchema, handler);
