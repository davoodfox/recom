import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const entry = await prisma.recommendation.create({
      data: body,
    });
    const user = await prisma.user.findUnique({
      where: { clerkId: body.toClerkId },
      include: {
        recommendationsReceived: { orderBy: { createdAt: "desc" } },
      },
    });
    return NextResponse.json({
      data: user,
      message: "Created new entry",
      success: true,
    });
  } catch (err) {
    return NextResponse.json({
      error: "Error on '/api/recommendation': " + err,
      status: 400,
    });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id") || "";
    const entry = await prisma.recommendation.delete({ where: { id: id } });
    return NextResponse.json({
      data: entry,
      message: "Deleted entry",
      success: true,
    });
  } catch (err) {
    return NextResponse.json({
      error: "Error on '/api/recommendation': " + err,
      status: 400,
    });
  }
}
