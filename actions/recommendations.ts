"use server";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createRecommendation(formData: FormData) {
  const schema = z.object({
    animeId: z.string().nonempty(),
    fromUsername: z.string().nonempty(),
    toUsername: z.string().nonempty(),
    note: z.string(),
  });
  const data = schema.parse({
    animeId: formData.get("animeId"),
    fromUsername: formData.get("fromUsername"),
    toUsername: formData.get("toUsername"),
    note: formData.get("note"),
  });

  try {
    await prisma.recommendation.create({
      data: data,
    });
    revalidatePath("/dashboard");
    return {
      message: "Created new recommendation",
      success: true,
    };
  } catch (err) {
    return {
      error: "Failed to create recommendation': " + err,
      status: 400,
    };
  }
}

export async function deleteRecommendation(formData: FormData) {
  const schema = z.object({
    id: z.string().nonempty(),
  });
  const data = schema.parse({
    id: formData.get("id"),
  });

  try {
    await prisma.recommendation.delete({ where: { id: data.id } });
    revalidatePath("/dashboard");
    return { message: "Deleted recommendation" };
  } catch (err) {
    return {
      error: "Failed to delete recommendation': " + err,
      status: 400,
    };
  }
}
