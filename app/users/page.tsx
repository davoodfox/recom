import { clerkClient } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {}

async function Page(props: Props) {
  const {} = props;
  const users = await clerkClient.users.getUserList();

  return (
    <div>
      {users.map((user) => (
        <Link
          href={`/users/${user.id}`}
          className="flex gap-2 p-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
        >
          <Image
            src={user.imageUrl}
            alt={user.username || "default user"}
            width={50}
            height={50}
            className="rounded-full object-cover w-14 h-14"
          />
          <h2>{user.username}</h2>
        </Link>
      ))}
    </div>
  );
}

export default Page;
