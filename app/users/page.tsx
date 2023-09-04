import { prisma } from "@/utils/db";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {}

async function Page(props: Props) {
  const users = await prisma.user.findMany();

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} className="flex items-center gap-2 p-2 border-b">
          <Image
            src={user.imageUrl}
            alt={user.username || "default user"}
            width={50}
            height={50}
            className="rounded-full object-cover w-10 h-10"
          />
          <div>
            <Link href={`/users/${user.id}`}>
              <h2 className="text-blue-600 underlin hover:no-underline">
                {user.username}
              </h2>
            </Link>
            <span className="text-gray-400">
              joined {user.createdAt.toLocaleDateString()}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Page;
