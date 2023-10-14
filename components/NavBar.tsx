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
      <div className="flex justify-between items-center">
        <ul className="flex gap-2 items-center">
          <Image
            priority
            src={Icon}
            alt=""
            width={100}
            height={100}
            className="mr-2"
          />
          <li>
            <Link href="/">Home</Link>
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
        <div className="mx-6 ">
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
                  width: "50px",
                  height: "50px",
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
