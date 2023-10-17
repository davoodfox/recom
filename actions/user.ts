"use server";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function addFollowing(formData: FormData) {
  const following = formData.get("following");
  const followedBy = formData.get("followedBy");

  const schema = z.object({
    following: z.string().nonempty(),
    followedBy: z.string().nonempty(),
  });

  const data = schema.parse({
    following: following,
    followedBy: followedBy,
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
  } catch (err) {
    return NextResponse.json({
      error: "Failed to add following': " + err,
      status: 400,
    });
  }
}

export async function removeFollowing(formData: FormData) {
  const following = formData.get("following");
  const followedBy = formData.get("followedBy");

  const schema = z.object({
    following: z.string().nonempty(),
    followedBy: z.string().nonempty(),
  });

  const data = schema.parse({
    following: following,
    followedBy: followedBy,
  });

  try {
    const followingUser = await prisma.user.findUnique({
      where: { id: data.following },
    });
    const followedByUser = await prisma.user.findUnique({
      where: { id: data.followedBy },
    });

    if (!followingUser || !followedByUser) {
      return NextResponse.json({
        error: "Failed to remove following: ",
        status: 400,
      });
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

    return NextResponse.json({
      message: "Following removed.",
      success: true,
    });
  } catch (err) {
    return NextResponse.json({
      error: "Failed to remove following: " + err,
      status: 400,
    });
  }
}
