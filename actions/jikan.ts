"use server";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { AnimeClient } from "@tutkli/jikan-ts";
const animeClient = new AnimeClient();

export async function getJikanAnimeSearch(formData: FormData) {
  console.log("_________________________________----------------");
  const query = formData.get("query") as string;

  console.log(query);

  const schema = z.object({
    query: z.string().nonempty(),
  });

  const data = schema.parse({
    query: query,
  });

  console.log(data);
  console.log(data.query);
  try {
    const anime = await animeClient.getAnimeSearch({
      q: data.query,
      limit: 25,
    });
    console.log(anime);
    return {
      message: "Received jikan anime seatch",
      success: true,
      data: anime.data,
    };
  } catch (err) {
    return {
      error: "Failed to get jikan anime search': " + err,
      status: 400,
    };
  }
}
