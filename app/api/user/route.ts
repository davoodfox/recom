import { prisma } from "@/utils/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id") || "";
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        clerkId: id as string,
      },
      include: {
        recommendationsGiven: { orderBy: { createdAt: "desc" } },
        recommendationsReceived: { orderBy: { createdAt: "desc" } },
      },
    });
    return NextResponse.json({
      data: user,
      success: true,
    });
  } catch (err) {
    return NextResponse.json({
      error: "Error on '/api/user': " + err,
      status: 400,
    });
  }
}
