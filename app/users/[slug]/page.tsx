import React from "react";
import { clerkClient } from "@clerk/nextjs";
import Image from "next/image";

async function Page({ params }: { params: { slug: string } }) {
  const user = await clerkClient.users.getUser(params.slug);

  return (
    <div>
      <div className="flex gap-2 rounded-3xl overflow-hidden shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <Image
          src={user.imageUrl}
          alt={user.username || "default user"}
          width={200}
          height={200}
        />
        <h2 className="text-2xl">{user.username}</h2>
      </div>
    </div>
  );
}

export default Page;
