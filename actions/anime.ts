"use server";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createAnime(formData: FormData) {
  const form = JSON.parse(formData.get("data") as string);

  const schema = z.object({
    title: z.string().nonempty(),
    imageUrl: z.string().nonempty(),
    synopsis: z.string().nonempty(),
    airing: z.boolean(),
    year: z.number(),
    malUrl: z.string().nonempty(),
    malId: z.number(),
  });

  const data = schema.parse({
    title: form.title,
    imageUrl: form.imageUrl,
    synopsis: form.synopsis,
    airing: form.airing,
    year: form.year,
    malUrl: form.malUrl,
    malId: form.malId,
  });

  try {
    const anime = await prisma.anime.upsert({
      create: {
        airing: data.airing,
        imageUrl: data.imageUrl,
        malId: data.malId,
        malUrl: data.malUrl,
        synopsis: data.synopsis,
        title: data.title,
        year: data.year,
      },
      update: {},
      where: { malId: data.malId },
    });
    return {
      message: "Created new anime",
      success: true,
      data: anime,
    };
  } catch (err) {
    return {
      error: "Failed to create anime': " + err,
      status: 400,
    };
  }
}
