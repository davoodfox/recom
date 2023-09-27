"use server";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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
  } catch (e) {
    return { message: "Failed to delete recommendation" };
  }
}
