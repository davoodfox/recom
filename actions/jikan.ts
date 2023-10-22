"use server";
import { z } from "zod";
import { AnimeClient } from "@tutkli/jikan-ts";
const animeClient = new AnimeClient();

export async function getJikanAnimeSearch(formData: FormData) {
  const schema = z.object({
    query: z.string().nonempty(),
  });
  const data = schema.parse({
    query: formData.get("query"),
  });

  try {
    const result = await animeClient.getAnimeSearch({
      q: data.query,
      limit: 25,
    });
    return {
      message: "Received jikan anime seatch",
      success: true,
      data: result.data,
    };
  } catch (err) {
    return {
      error: "Failed to get jikan anime search': " + err,
      status: 400,
    };
  }
}
