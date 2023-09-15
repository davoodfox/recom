import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const anime = await prisma.anime.upsert({
    create: {
      airing: body.airing,
      imageUrl: body.imageUrl,
      malId: body.malId,
      malUrl: body.malUrl,
      synopsis: body.synopsis,
      title: body.title,
      year: body.year,
    },
    update: {},
    where: { malId: body.malId },
  });

  return NextResponse.json({
    data: anime,
    success: true,
  });
}
