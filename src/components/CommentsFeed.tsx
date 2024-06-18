"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUser } from "@clerk/nextjs";
import { IPostDocument } from "@/DB/postModel";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useAction } from "@/hooks/useAction";
import { deleteComment } from "@/actions/delete-comment";
import { toast } from "sonner";

export const CommentsFeed = ({ post }: { post: IPostDocument }) => {
  const { excute } = useAction(deleteComment, {
    onSuccess() {
      toast.success("comment delete successfully");
    },
    onError(error) {
      toast.error(error);
    },
  });
  const { user } = useUser();

  const isAuthor = user?.id === post.user.userId;

  const onDeleteComment = (formData: FormData) => {
    const postId = formData.get("postId") as string;
    const commentId = formData.get("commentId") as string;

    excute({ postId, commentId });
  };

  return (
    <div>
      {post.comments &&
        post.comments.map((comment) => (
          <div
            key={comment._id as string}
            className="border py-2 px-1 space-y-3 mb-1"
          >
            <div className="flex item-center justify-between px-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={comment.user.userImage} />
                  <AvatarFallback>
                    {comment.user.firstName.charAt(0)}
                    {comment.user.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium">
                  {comment.user.firstName}
                  {"  "}
                  {comment.user.lastName}
                </span>
              </div>

              {(isAuthor || comment.user.userId == user?.id) && (
                <div>
                  <form action={onDeleteComment}>
                    <input
                      value={post._id as string}
                      name="postId"
                      hidden
                      readOnly
                    />
                    <input
                      value={comment._id as string}
                      name="commentId"
                      hidden
                      readOnly
                    />
                    <Button type="submit" size={"icon"} variant={"outline"}>
                      <Trash className="h-4" />
                    </Button>
                  </form>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-700 px-5">{comment.text}</p>
          </div>
        ))}
    </div>
  );
};
