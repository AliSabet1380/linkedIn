import { connectDB } from "@/DB/db";
import { Post } from "@/DB/postModel";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { post_id: string } }
) {
  try {
    await connectDB();

    const post = await Post.findById(params.post_id);
    if (!post)
      return NextResponse.json(
        { status: "fail", error: "Post not found" },
        { status: 404 }
      );

    return NextResponse.json(
      {
        status: "success",
        data: {
          post,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "error", error: "fail to load post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { post_id: string } }
) {
  auth().protect();

  const user = await currentUser();
  if (!user)
    return NextResponse.json(
      { status: "fail", error: "unauthorized" },
      { status: 403 }
    );

  try {
    await connectDB();

    const post = await Post.findById(params.post_id);
    if (!post)
      return NextResponse.json(
        { status: "fail", error: "post not found" },
        { status: 404 }
      );

    if (post?.user.userId !== user?.id)
      return NextResponse.json(
        {
          status: "fail",
          error: "You can only delete your own posts",
        },
        { status: 403 }
      );

    await post?.removePost();

    return NextResponse.json(
      { status: "success", data: null },
      { status: 204 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "fail to delete post", status: "error" },
      { status: 500 }
    );
  }
}
