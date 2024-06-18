import { connectDB } from "@/DB/db";
import { Post } from "@/DB/postModel";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();
    const posts = await Post.getAllPosts();

    return NextResponse.json(
      {
        status: "success",
        data: {
          posts,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { status: "error", error: "Fail to load posts" },
      { status: 500 }
    );
  }
}
