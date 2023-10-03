import Link from "next/link";
import React from "react";
import { SignedIn, UserButton, currentUser } from "@clerk/nextjs";
import { prisma } from "@/utils/db";

interface Props {}

async function NavBar(props: Props) {
  const {} = props;
  const cu = await currentUser();
  const user = await prisma.user.findUnique({ where: { clerkId: cu?.id } });

  return (
    <nav className="bg-blue-400 text-white p-2">
      <div className="flex justify-between">
        <ul className="flex gap-2 items-center">
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
              },
            },
          }}
        />
      </div>
    </nav>
  );
}

export default NavBar;
