import Link from "next/link";
import React from "react";
import { SignedIn, UserButton, currentUser } from "@clerk/nextjs";
import { prisma } from "@/utils/db";
import Image from "next/image";
import Icon from "@/public/logo.svg";

interface Props {}

async function NavBar(props: Props) {
  const {} = props;
  const cu = await currentUser();
  const user = await prisma.user.findUnique({ where: { clerkId: cu?.id } });

  return (
    <nav className=" text-black font-semibold p-2">
      <div className="flex gap-1 justify-between items-center">
        <ul className="flex gap-1 sm:gap-4 items-center text-xs sm:text-base">
          <li>
            <Link href="/">
              <Image
                priority
                src={Icon}
                alt=""
                width={60}
                height={60}
                className=""
              />
            </Link>
          </li>
          <li>
            <Link href="/recommend">Recommend</Link>
          </li>
          <li>
            <Link href="/users">Users</Link>
          </li>
          <SignedIn>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </SignedIn>
        </ul>
        <div className="">
          <UserButton
            afterSignOutUrl="/"
            userProfileMode="navigation"
            userProfileUrl="/user-management"
            appearance={{
              elements: {
                avatarImage: {
                  display: "none",
                },
                avatarBox: {
                  backgroundImage: `url(${user?.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  width: "40px",
                  height: "40px",
                },
              },
            }}
          />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
