import { Briefcase, HomeIcon, MessagesSquare, UserIcon } from "lucide-react";
import Link from "next/link";

export const Links = () => {
  return (
    <>
      <Link
        href={"/"}
        className="icon self-start flex-row md:flex-col gap-2 md:gap-0"
      >
        <HomeIcon className="h-5" />
        <p>Home</p>
      </Link>

      <Link
        href={"/"}
        className="icon self-start flex-row md:flex-col gap-2 md:gap-0"
      >
        <UserIcon className="h-5" />
        <p>Network</p>
      </Link>

      <Link
        href={"/"}
        className="icon self-start flex-row md:flex-col gap-2 md:gap-0"
      >
        <Briefcase className="h-5" />
        <p>Jobs</p>
      </Link>

      <Link
        href={"/"}
        className="icon self-start flex-row md:flex-col gap-2 md:gap-0"
      >
        <MessagesSquare className="h-5" />
        <p>Messages</p>
      </Link>
    </>
  );
};
