import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const followingUser = await prisma.user.findUnique({
      where: { id: body.following },
    });
    const followedByUser = await prisma.user.findUnique({
      where: { id: body.followedBy },
    });

    if (!followingUser || !followedByUser) {
      return NextResponse.json({
        error: "Error on '/api/following': ",
        status: 400,
      });
    }
    const followedByIDs = followingUser.followedByIDs.filter(
      (id) => id != body.followedBy
    );
    const followingIDs = followedByUser.followingIDs.filter(
      (id) => id != body.following
    );

    await prisma.user.update({
      where: { id: body.following },
      data: { followedByIDs: followedByIDs },
    });
    await prisma.user.update({
      where: { id: body.followedBy },
      data: { followingIDs: followingIDs },
    });

    return NextResponse.json({
      message: "Following removed.",
      success: true,
    });
  } catch (err) {
    return NextResponse.json({
      error: "Error on '/api/remove-following': " + err,
      status: 400,
    });
  }
}
