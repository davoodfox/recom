import Link from "next/link";
import React from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";

interface Props {}

function NavBar(props: Props) {
  const {} = props;

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
        />
      </div>
    </nav>
  );
}

export default NavBar;
