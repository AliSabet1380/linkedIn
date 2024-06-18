"use client";

import { IPostDocument } from "@/DB/postModel";
import { Button } from "./ui/button";
import { MessageCircle, Repeat2, Share, Share2, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useAction } from "@/hooks/useAction";
import { likePost } from "@/actions/like-post-ulike-post";
import { toast } from "sonner";
import { CommentForm } from "./CommentsForm";
import { CommentsFeed } from "./CommentsFeed";

export const PostOptions = ({ post }: { post: IPostDocument }) => {
  const { excute } = useAction(likePost, {
    onSuccess(data) {
      setIsLiked((pervState) => !pervState);
      toast.success(
        `${isLiked ? "post unlike successfully" : "post like successfully"}`
      );
    },
    onError(error) {
      toast.error(error);
    },
  });
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { user } = useUser();

  useEffect(() => {
    if (user?.id && post.likes?.includes(user.id)) setIsLiked(true);
  }, [post, user]);

  const onLike = (formData: FormData) => {
    const postId = formData.get("postId") as string;

    excute({ postId });
  };

  return (
    <div>
      <div className="flex items-center justify-evenly pb-4">
        <div>
          <p className="text-xs text-gray-500 cursor-pointer hover:underline">
            {post.likes?.length} likes
          </p>
        </div>
        <div
          onClick={() => {
            setIsCommentOpen(true);
          }}
        >
          <p className="text-xs text-gray-500 cursor-pointer hover:underline">
            {post.comments?.length} comments
          </p>
        </div>
      </div>

      <div className=" flex items-center justify-evenly">
        <form action={onLike}>
          <input value={post._id as string} hidden name="postId" readOnly />
          <Button variant={"ghost"}>
            <ThumbsUp
              className={` h-4 ${
                (cn("mr-1"), isLiked ? "text-blue-500 " : "text-black")
              }`}
            />
            <span
              className={` h-4 ${
                (cn("mr-1"), isLiked ? "text-blue-500 " : "text-black")
              }`}
            >
              likes
            </span>
          </Button>
        </form>

        <div>
          <Button
            onClick={() => {
              setIsCommentOpen((pervState) => !pervState);
            }}
            variant={"ghost"}
          >
            <MessageCircle
              className={` h-4 ${
                (cn("mr-1"), isCommentOpen ? "text-blue-500 " : "text-black")
              }`}
            />
            <span
              className={` h-4 ${
                (cn("mr-1"), isCommentOpen ? "text-blue-500 " : "text-black")
              }`}
            >
              comments
            </span>
          </Button>
        </div>

        <div>
          <Button variant={"ghost"}>
            <Repeat2 className={` h-4 ${cn("mr-1")}`} />
            repost
          </Button>
        </div>

        <div>
          <Button variant={"ghost"}>
            <Share2 className={` h-4 ${cn("mr-1")}`} />
            share
          </Button>
        </div>
      </div>

      {isCommentOpen && (
        <div className="py-4 px-1">
          <hr className="w-full border-gray-400 my-2" />
          <CommentForm postId={post._id as string} />
          <hr className="w-full border-gray-400 my-2" />
          <CommentsFeed post={post} />
        </div>
      )}
    </div>
  );
};
