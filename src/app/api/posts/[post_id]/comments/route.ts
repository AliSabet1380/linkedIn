import { ICommentBase } from "@/DB/commentModel";
import { connectDB } from "@/DB/db";
import { Post } from "@/DB/postModel";
import { IUser } from "@/types/types";
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
        { status: "fail", error: "post not found" },
        { status: 404 }
      );

    const comments = await post.getAllComments();

    return NextResponse.json(
      {
        status: "success",
        data: {
          comments,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: "error",
        error: "fail to fetch comments",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { post_id: string } }
) {
  // auth().protect();
  // const user = await currentUser();
  // if (!user)
  // return NextResponse.json(
  // { status: "fail", error: "unauthorized" },
  // { status: 403 }
  // );

  const { text, user }: { text: string; user: IUser } = await req.json();
  try {
    await connectDB();

    const post = await Post.findById(params.post_id);
    if (!post)
      return NextResponse.json(
        { staus: "fail", error: "post not found" },
        { status: 404 }
      );

    const comment: ICommentBase = {
      text,
      user,
    };
    await post.commentOnPost(comment);
    return NextResponse.json(
      { status: "success", data: null },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: "error",
        error: "fail to comment on post",
      },
      { status: 500 }
    );
  }
}
