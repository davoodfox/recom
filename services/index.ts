import { prisma } from '@/utils/db'
import { AnimeClient } from '@tutkli/jikan-ts'
const animeClient = new AnimeClient()
function createURL(path: string) {
  return window.location.origin + path
}

export async function getAnimeSeach(query: string) {
  return await animeClient.getAnimeSearch({ q: query, limit: 25 })
}

export async function getAnime(id: number) {
  return await animeClient.getAnimeById(id)
}

export async function createRecommendation({
  malId,
  note,
  fromClerkId,
  toClerkId,
}: {
  malId: number
  note: string
  fromClerkId: string
  toClerkId: string
}) {
  const res = await fetch(
    new Request(createURL('/api/recommendation'), {
      method: 'POST',
      body: JSON.stringify({ malId, note, fromClerkId, toClerkId }),
    })
  )
  if (res.ok) {
    const data = await res.json()
    return data
  }
}
