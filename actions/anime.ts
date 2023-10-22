"use server";
import { prisma } from "@/utils/db";
import { z } from "zod";

export async function createAnime(formData: FormData) {
  const schema = z.object({
    title: z.string().nonempty(),
    imageUrl: z.string().nonempty(),
    synopsis: z.string().nonempty(),
    airing: z.boolean(),
    year: z.number(),
    malUrl: z.string().nonempty(),
    malId: z.number(),
  });
  // Since we receive all of the fields in one FormData value as a string, we need to parse it's value to match the schema.
  type Schema = z.infer<typeof schema>;
  const form: Schema = JSON.parse(formData.get("data") as string);
  const data = schema.parse(form);

  try {
    const result = await prisma.anime.upsert({
      create: data,
      update: {},
      where: { malId: data.malId },
    });
    return {
      message: "Created new anime",
      success: true,
      data: result,
    };
  } catch (err) {
    return {
      error: "Failed to create anime': " + err,
      status: 400,
    };
  }
}
