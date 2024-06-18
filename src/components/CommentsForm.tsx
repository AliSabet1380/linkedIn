"use client";

import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAction } from "@/hooks/useAction";
import { commentOnPost } from "@/actions/comment-on-post";
import { ElementRef, useRef } from "react";

export const CommentForm = ({ postId }: { postId: string }) => {
  const formRef = useRef<ElementRef<"form">>(null);
  const { excute } = useAction(commentOnPost, {
    onSuccess(data) {
      toast.success("comment successfully added");
    },
    onError(error) {
      toast.error(error);
    },
  });
  const { user } = useUser();

  const onSubmit = (formData: FormData) => {
    const postId = formData.get("postId") as string;
    const text = formData.get("text") as string;

    excute({ postId, text });
    formRef.current?.reset();
  };
  return (
    <div className="">
      <form
        ref={formRef}
        action={onSubmit}
        className="flex flex-1 flex-col gap-3 w-full px-3"
      >
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage
              src={user?.imageUrl || "https://github.com/shadcn.png"}
              alt="image"
            />

            <AvatarFallback>
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <input
            type="text"
            name="text"
            className="flex-1 outline-none rounded-full py-2 px-4 border-2 "
            placeholder="Start writing a comment..."
          />
          <input hidden value={postId} name="postId" readOnly />
          <button type="submit" hidden />
        </div>
      </form>
    </div>
  );
};
