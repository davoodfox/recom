import Link from "next/link";
import React from "react";
import { UserButton } from "@clerk/nextjs";

interface Props {}

function NavBar(props: Props) {
  const {} = props;

  return (
    <nav>
      <ul>
        <UserButton afterSignOutUrl="/" />

        <li>
          <Link href="/">Home</Link>
          <Link href="/users">Users</Link>
          <Link href="/anime">Anime</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
