"use client";

import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { ImageIcon, Upload, XIcon } from "lucide-react";
import { ChangeEvent, ElementRef, useRef, useState } from "react";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useAction } from "@/hooks/useAction";
import { createNewPost } from "@/actions/create-post";

export const PostForm = () => {
  const { excute } = useAction(createNewPost, {
    onSuccess(data) {
      toast.success("Post Created!");
    },
    onError(error) {
      toast.error(error);
    },
  });
  const formRef = useRef<ElementRef<"form">>(null);
  const fileInputRef = useRef<ElementRef<"input">>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { user } = useUser();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const onSubmit = (formData: FormData) => {
    const text = formData.get("text") as string;
    const file = formData.get("file") as File;

    if (file && file.size > 20000000) return toast.error("file is too big");
    if (!text.trim()) return toast.error("Post Text Is Empty");

    excute(formData);
    setPreview(null);
    formRef.current?.reset();
  };

  return (
    <div className="border bg-white rounded-lg p-3">
      <form ref={formRef} action={onSubmit} className="flex flex-col gap-3">
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
            className="flex-1 outline-none rounded-full py-2.5 px-4 border"
            placeholder="Start writing a post..."
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            name="file"
            hidden
            onChange={handleImageChange}
          />

          <Button
            className="flex items-center gap-1"
            type="submit"
            size={"icon"}
            variant={"outline"}
          >
            <Upload className="h-4" />
          </Button>
        </div>

        {preview && (
          <div className="mt-3">
            <Image
              src={preview}
              alt="image"
              width={200}
              height={200}
              className="w-full object-cover"
            />
          </div>
        )}

        <div className="flex  items-center justify-end px-2 gap-4">
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1"
          >
            <ImageIcon className="h-4" />
            {preview ? "Chnage Image" : "Add Image"}
          </Button>
          {preview && (
            <Button
              onClick={() => {
                formRef?.current?.reset();
                setPreview(null);
              }}
              type="button"
              variant={"destructive"}
              className="flex items-center gap-1"
            >
              <XIcon className="h-4" />
              Remove Image
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
