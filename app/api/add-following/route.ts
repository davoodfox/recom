import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await prisma.user.update({
      where: { id: body.followedBy },
      data: { followingIDs: { push: body.following } },
    });
    await prisma.user.update({
      where: { id: body.following },
      data: { followedByIDs: { push: body.followedBy } },
    });

    return NextResponse.json({
      message: "Following added.",
      success: true,
    });
  } catch (err) {
    return NextResponse.json({
      error: "Error on '/api/add-following': " + err,
      status: 400,
    });
  }
}
