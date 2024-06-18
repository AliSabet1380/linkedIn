"use server";

import { connectDB } from "@/DB/db";
import { InputType, ReturnType } from "./types";
import { Post } from "@/DB/postModel";
import { createSafeAction } from "../safeAction";
import { FetchZodSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  let posts;
  try {
    await connectDB();

    posts = await Post.getAllPosts();
  } catch (error) {
    return { error: "Fail to fetch all posts" };
  }

  return { data: posts };
};

export const fetchPosts = createSafeAction(FetchZodSchema, handler);
