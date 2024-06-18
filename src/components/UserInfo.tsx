"use client";

import { currentUser } from "@clerk/nextjs/server";
import { SignInButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export const UserInfo = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-col justify-center items-center bg-white rounded-lg border py-4 space-y-4">
      <Avatar>
        {user ? (
          <AvatarImage src={user?.imageUrl} alt="image" />
        ) : (
          <AvatarImage src="https://github.com/shadcn.png" alt="image" />
        )}
        <AvatarFallback>
          {user?.firstName?.charAt(0)} {user?.lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <SignedIn>
        <div className="text-center">
          <p className="font-semibold">
            {user?.firstName} {user?.lastName}
          </p>

          <p className="text-xs">
            @ {user?.firstName}
            {user?.lastName}-{user?.id.slice(-4)}
          </p>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="text-center space-y-2">
          <p className="font-medium">You are not signed in</p>
        </div>
        <Button asChild>
          <SignInButton />
        </Button>
      </SignedOut>

      <hr className="w-10/12 border-gray-300 my-5 " />

      <div className="flex items-center justify-between px-4 w-full text-sm">
        <p className="font-medium text-gray-400">Comments</p>
        <p className="text-blue-400">0</p>
      </div>

      <div className="flex items-center justify-between px-4 w-full text-sm">
        <p className="font-medium text-gray-400">Posts</p>
        <p className="text-blue-400">0</p>
      </div>
    </div>
  );
};
