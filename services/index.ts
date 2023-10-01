import { prisma } from "@/utils/db";
import { AnimeClient } from "@tutkli/jikan-ts";
import { auth } from "@clerk/nextjs";
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

export async function createRecommendation({
  animeId,
  note,
  fromUsername,
  toUsername,
}: {
  animeId: string;
  note: string;
  fromUsername: string;
  toUsername: string;
}) {
  const res = await fetch(
    new Request(createURL("/api/recommendation"), {
      method: "POST",
      body: JSON.stringify({ animeId, note, fromUsername, toUsername }),
    })
  );
  if (res.ok) {
    const data = await res.json();
    return data;
  }
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

export async function addFollowing({
  following,
  followedBy,
}: {
  following: string;
  followedBy: string;
}) {
  const res = await fetch(
    new Request(createURL("/api/add-following"), {
      method: "POST",
      body: JSON.stringify({ following, followedBy }),
    })
  );

  if (res.ok) {
    const data = await res.json();
    return data;
  }
}

export async function removeFollowing({
  following,
  followedBy,
}: {
  following: string;
  followedBy: string;
}) {
  const res = await fetch(
    new Request(createURL("/api/remove-following"), {
      method: "POST",
      body: JSON.stringify({ following, followedBy }),
    })
  );

  if (res.ok) {
    const data = await res.json();
    return data;
  }
}
