import { AnimeClient } from "@tutkli/jikan-ts";
const animeClient = new AnimeClient();
function createURL(path: string) {
  return window.location.origin + path;
}

export async function getAnime(id: number) {
  return await animeClient.getAnimeById(id);
}
