import { getAnime } from '@/services'
import { clerkClient } from '@clerk/nextjs'
import Link from 'next/link'

async function RecommendationBox({
  recommendation,
  host,
}: {
  recommendation: {
    id: string
    createdAt: Date
    updatedAt: Date
    malId: number
    note: string
    fromClerkId: string
    toClerkId: string
  }
  host: 'given' | 'received'
}) {
  const { data: anime } = await getAnime(recommendation.malId)
  function whichUser() {
    if (host == 'given') {
      return recommendation.toClerkId
    } else if (host == 'received') {
      return recommendation.fromClerkId
    } else {
      return ''
    }
  }
  const user = await clerkClient.users.getUser(whichUser())

  return (
    <li className="flex gap-1 items-baseline">
      <h3 className="text-xl">{anime.title}</h3>
      <span className="text-gray-800 text-xs">
        {host == 'given' && 'by'}
        {host == 'received' && 'from'}
      </span>
      <Link
        href={'/users/' + user.id}
        className="text-blue-400 hover:text-blue-600"
      >
        {user.username}
      </Link>
    </li>
  )
}

export default RecommendationBox
