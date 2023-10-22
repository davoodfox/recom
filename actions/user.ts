"use server";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function addFollowing(formData: FormData) {
  const schema = z.object({
    following: z.string().nonempty(),
    followedBy: z.string().nonempty(),
  });
  const data = schema.parse({
    following: formData.get("following"),
    followedBy: formData.get("followedBy"),
  });

  try {
    await prisma.user.update({
      where: { id: data.followedBy },
      data: { followingIDs: { push: data.following } },
    });
    await prisma.user.update({
      where: { id: data.following },
      data: { followedByIDs: { push: data.followedBy } },
    });
    revalidatePath("/users/[slug]");
    return {
      message: "Following added.",
      success: true,
    };
  } catch (err) {
    return {
      error: "Failed to add following': " + err,
      status: 400,
    };
  }
}

export async function removeFollowing(formData: FormData) {
  const schema = z.object({
    following: z.string().nonempty(),
    followedBy: z.string().nonempty(),
  });
  const data = schema.parse({
    following: formData.get("following"),
    followedBy: formData.get("followedBy"),
  });

  try {
    const followingUser = await prisma.user.findUnique({
      where: { id: data.following },
    });
    const followedByUser = await prisma.user.findUnique({
      where: { id: data.followedBy },
    });
    if (!followingUser || !followedByUser) {
      return {
        error: "Failed to remove following: ",
        status: 400,
      };
    }
    const followedByIDs = followingUser.followedByIDs.filter(
      (id) => id != data.followedBy
    );
    const followingIDs = followedByUser.followingIDs.filter(
      (id) => id != data.following
    );
    await prisma.user.update({
      where: { id: data.following },
      data: { followedByIDs: followedByIDs },
    });
    await prisma.user.update({
      where: { id: data.followedBy },
      data: { followingIDs: followingIDs },
    });
    revalidatePath("/users/[slug]");
    return {
      message: "Following removed.",
      success: true,
    };
  } catch (err) {
    return {
      error: "Failed to remove following: " + err,
      status: 400,
    };
  }
}
