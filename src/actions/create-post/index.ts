"use server";

import { storage } from "@/firebase";
import { currentUser } from "@clerk/nextjs/server";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { Post } from "@/DB/postModel";
import { IUser } from "@/types/types";
import { connectDB } from "@/DB/db";
import { CreatePostZodSchema } from "./schema";
import { InputType, ReturnType } from "./type";
import { createSafeAction } from "../safeAction";
import { ObjectId } from "mongoose";
import { revalidatePath } from "next/cache";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser();
  if (!user) return { error: "unauthorized!" };

  const file = data.get("file") as File;
  const text = data.get("text") as string;

  if (!text.trim() && text.length >= 2) return { error: "text is required!" };

  const userDB: IUser = {
    userId: user.id,
    userImage: user.imageUrl,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  };
  let post;

  try {
    await connectDB();

    if (file?.size > 0) {
      const storageRef = ref(storage, `${file.name}-${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      const imageUrl = await getDownloadURL((await uploadTask).ref);

      post = await Post.create({ imageUrl, text, user: userDB });
    } else {
      post = await Post.create({ text, user: userDB });
    }
  } catch (error) {
    return { error: "fail to create post" };
  }

  revalidatePath("/");
  return { data: post };
};

export const createNewPost = createSafeAction(CreatePostZodSchema, handler);
