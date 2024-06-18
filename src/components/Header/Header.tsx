"use client";

import { SignInButton, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Menu, SearchIcon } from "lucide-react";
import Image from "next/image";

import { useMobileSidebar } from "@/zustand/useMobileSidebar";
import { Links } from "./Links";
import { Button } from "../ui/button";
import { Sheet, SheetContent } from "../ui/sheet";

export const Header = () => {
  const { isOpen, open, close } = useMobileSidebar();

  return (
    <div className="flex item-center p-2 max-w-7xl mx-auto">
      <Image
        src={"https://links.papareact.com/b3z"}
        width={40}
        height={40}
        className="rounded-lg"
        alt="linkedin"
      />

      <div className="flex-1">
        <form className="flex items-center space-x-1 bg-slate-200 rounded-md flex-1 mx-2 max-w-96 p-2">
          <SearchIcon className="h-4 text-gray-600" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none flex-1"
          />
        </form>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <Links />

        <SignedIn>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <Button size={"default"} asChild>
            <SignInButton />
          </Button>
        </SignedOut>
      </div>

      <div className="flex md:hidden">
        <Button onClick={open} variant={"outline"} size={"icon"}>
          <Menu className="h-5" />
        </Button>
        <Sheet open={isOpen} onOpenChange={close}>
          <SheetContent className="flex flex-col">
            <div className="flex items-center gap-3">
              <SignedIn>
                <UserButton />
                <Button asChild>
                  <SignOutButton />
                </Button>
              </SignedIn>

              <SignedOut>
                <Button asChild>
                  <SignInButton />
                </Button>
              </SignedOut>
            </div>
            <Links />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
