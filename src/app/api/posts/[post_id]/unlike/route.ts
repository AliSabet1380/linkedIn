import { connectDB } from "@/DB/db";
import { Post } from "@/DB/postModel";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { post_id: string } }
) {
  // auth().protect();
  // const user = await currentUser();
  // if (!user)
  //   return NextResponse.json({ status: "fail", error: "unauthorized" });

  const { user } = await req.json();
  try {
    await connectDB();

    const post = await Post.findById(params.post_id);
    if (!post)
      return NextResponse.json({ status: "fail", error: "post not found" });

    await post.unlikePost(user.userId);
    return NextResponse.json(
      { status: "success", data: null },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ status: "error", error: "fail to unlike post" });
  }
}
