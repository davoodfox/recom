import React from 'react'
import { clerkClient, currentUser } from '@clerk/nextjs'
import Image from 'next/image'
import AnimeSearch from '@/components/AnimeSearch'
import { prisma } from '@/utils/db'
import RecommendationBox from '@/components/RecommendationBox'

async function Page({ params: { slug } }: { params: { slug: string } }) {
  const { imageUrl, username } = await clerkClient.users.getUser(slug)
  const user = await prisma.user.findUnique({
    include: { recommendationsGiven: true, recommendationsReceived: true },
    where: { clerkId: slug },
  })

  return (
    <div>
      <div className="flex flex-col items-center sm:flex-row sm:gap-2 sm:rounded-3xl shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <Image
          src={imageUrl}
          alt={username || 'default user'}
          width={200}
          height={200}
          className="overflow-hidden sm:rounded-ss-3xl sm:rounded-es-3xl"
        />

        <div className="py-4 sm:p-4">
          <h2 className="text-2xl">{username}</h2>
          <AnimeSearch />
        </div>
      </div>
      <div className="grid grid-cols-2 mt-4">
        <div>
          <h3>Recommendations Given:</h3>
          <ul>
            {user?.recommendationsGiven.map((recommendation) => (
              <RecommendationBox
                key={recommendation.id}
                recommendation={recommendation}
                host="given"
              />
            ))}
          </ul>
        </div>
        <div>
          <h3>Recommendations Received:</h3>
          <ul>
            {user?.recommendationsReceived.map((recommendation) => (
              <RecommendationBox
                key={recommendation.id}
                recommendation={recommendation}
                host="received"
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Page
