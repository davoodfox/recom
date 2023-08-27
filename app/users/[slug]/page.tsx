import React from 'react'
import { clerkClient } from '@clerk/nextjs'
import Image from 'next/image'
import AnimeSearch from '@/components/AnimeSearch'

async function Page({ params: { slug } }: { params: { slug: string } }) {
  const user = await clerkClient.users.getUser(slug)

  return (
    <div>
      <div className="flex flex-col items-center sm:flex-row sm:gap-2 sm:rounded-3xl shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <Image
          src={user.imageUrl}
          alt={user.username || 'default user'}
          width={200}
          height={200}
          className="overflow-hidden sm:rounded-ss-3xl sm:rounded-es-3xl"
        />

        <div className="py-4 sm:p-4">
          <h2 className="text-2xl">{user.username}</h2>
          <AnimeSearch />
        </div>
      </div>
    </div>
  )
}

export default Page
