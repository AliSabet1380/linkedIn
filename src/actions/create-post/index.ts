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
      const storageRef = ref(storage, `posts/${file.name}-${Date.now()}`);

      // Create metadata for the upload
      const metadata = {
        contentType: file.type,
      };

      // Upload the file
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      // Wait for the upload to complete
      const snapshot = await uploadTask;

      // Get the download URL
      const imageUrl = await getDownloadURL(snapshot.ref);

      post = await Post.create({ imageUrl, text, user: userDB });
    } else {
      post = await Post.create({ text, user: userDB });
    }
  } catch (error) {
    console.error("Firebase Storage Error:", error);
    return { error: `Failed to upload file` };
  }

  revalidatePath("/");
  return { data: post };
};

export const createNewPost = createSafeAction(CreatePostZodSchema, handler);
