import { prisma } from "@/utils/db";
import { NextResponse, NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const entry = await prisma.recommendation.create({
      data: body,
    });
    revalidatePath("/dashboard"); //not working
    return NextResponse.json({
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
