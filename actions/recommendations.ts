"use server";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function addRecommendation(formData: FormData) {
  const schema = z.object({
    animeId: z.string().nonempty(),
    note: z.string(),
    fromUsername: z.string().nonempty(),
    toUsername: z.string().nonempty(),
  });

  const data = schema.parse({
    animeId: formData.get("animeId"),
    note: formData.get("note"),
    fromUsername: formData.get("fromUserName"),
    toUsername: formData.get("toUserName"),
  });
  try {
    await prisma.recommendation.create({ data: data });
    revalidatePath("/dashboard");
    return NextResponse.json({
      message: "Created new recommendation",
      success: true,
    });
  } catch (err) {
    return NextResponse.json({
      error: "Failed to create recommendation': " + err,
      status: 400,
    });
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
    return NextResponse.json({ message: "Deleted recommendation" });
  } catch (err) {
    return NextResponse.json({
      error: "Failed to delete recommendation': " + err,
      status: 400,
    });
  }
}
