"use client";

import { IPostDocument } from "@/DB/postModel";
import { useUser } from "@clerk/nextjs";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import ReactTimeago from "react-timeago";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useAction } from "@/hooks/useAction";
import { deletePost } from "@/actions/delete-post";
import Image from "next/image";
import { PostOptions } from "./PostOptions";

export const Post = ({ post }: { post: IPostDocument }) => {
  const { excute } = useAction(deletePost, {
    onSuccess() {
      toast.success("Post delete successfully");
    },
    onError(error) {
      toast.error(error);
    },
  });
  const { user } = useUser();

  const isAuthor = post.user.userId === user?.id;

  const onDeletePost = (formData: FormData) => {
    const postId = formData.get("postId") as string;

    excute({ postId });
  };

  return (
    <div className="bg-white rounded-md border ">
      <div className="p-4 flex space-x-2">
        <div>
          <Avatar>
            <AvatarImage src={post.user.userImage} />
            <AvatarFallback>
              {post.user.firstName?.charAt(0)}
              {post.user.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex justify-between flex-1">
          <div className="flex items-start flex-col">
            <div className="text-sm font-medium space-x-4">
              <span>
                {post.user.firstName}
                {post.user.lastName}
              </span>
              {isAuthor && (
                <Badge className="ml-2" variant={"secondary"}>
                  Author
                </Badge>
              )}
            </div>

            <p className="text-xs text-gray-400">
              @{post.user.firstName}
              {post.user.lastName}-{post.user.userId.toString().slice(-4)}
            </p>

            <p className="text-xs text-gray-400">
              <ReactTimeago date={new Date(post.createdAt)} />
            </p>
          </div>

          {isAuthor && (
            <form action={onDeletePost}>
              <input
                value={post._id as string}
                type="text"
                name="postId"
                hidden
                readOnly
              />
              <Button size={"icon"} variant={"outline"}>
                <Trash className="h-4" />
              </Button>
            </form>
          )}
        </div>
      </div>

      <div>
        <p className="px-4 pb-2 mt-2">{post.text}</p>
        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            alt={post.text}
            width={500}
            height={500}
            className="w-full mx-auto object-cover"
          />
        )}
      </div>
      <hr className="border-gray-400 w-full my-3" />

      <PostOptions post={post} />
    </div>
  );
};
