import { AnimeClient } from '@tutkli/jikan-ts'

export async function getAnime(query: string) {
  const animeClient = new AnimeClient()
  return await animeClient.getAnimeSearch({ q: query, limit: 25 })
}
