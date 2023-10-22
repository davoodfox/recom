import { AnimeClient } from "@tutkli/jikan-ts";
const animeClient = new AnimeClient();
function createURL(path: string) {
  return window.location.origin + path;
}

export async function getAnimeSeach(query: string) {
  return await animeClient.getAnimeSearch({ q: query, limit: 25 });
}

export async function getAnime(id: number) {
  return await animeClient.getAnimeById(id);
}

export async function getUser(id: string | null) {
  const res = await fetch(
    new Request(createURL("/api/user?id=" + id), {
      method: "GET",
    })
  );

  if (res.ok) {
    const data = await res.json();
    return data;
  }
}
