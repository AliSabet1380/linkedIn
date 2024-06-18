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
        { error: "post not found", status: "fail" },
        { status: 404 }
      );

    const likes = post.likes;
    return NextResponse.json(
      {
        status: "success",
        data: {
          likes,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "error", error: "fail to fetch likes" },
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
  //   return NextResponse.json(
  //     { status: "fail", error: "unauthorized" },
  //     { status: 403 }
  //   );

  const { user } = await req.json();
  try {
    await connectDB();

    const post = await Post.findById(params.post_id);
    if (!post)
      return NextResponse.json(
        { status: "fail", error: "post not found" },
        { status: 404 }
      );
    console.log(user.userId);

    await post.likePost(user.userId);
    return NextResponse.json({ status: "succes", data: null }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { status: "error", error: "fail to like post" },
      { status: 500 }
    );
  }
}
