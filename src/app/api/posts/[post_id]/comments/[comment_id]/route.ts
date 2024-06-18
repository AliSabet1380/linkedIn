import { NextResponse } from "next/server";

import { connectDB } from "./../../../../../../DB/db";
import { Comment } from "./../../../../../../DB/commentModel";

export async function GET(
  req: Request,
  { params }: { params: { post_id: string; comment_id: string } }
) {
  try {
    await connectDB();

    const comment = await Comment.findById(params.comment_id);
    if (!comment)
      return NextResponse.json(
        { status: "fail", error: "comment not found" },
        { status: 404 }
      );

    return NextResponse.json({
      status: "success",
      data: {
        comment,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", error: "fail to load comment" },
      { status: 500 }
    );
  }
}
