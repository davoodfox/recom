import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const entry = await prisma.recommendation.create({
      data: body,
    })
    return NextResponse.json({
      data: entry,
      message: 'Created new entry',
      success: true,
    })
  } catch (err) {
    return NextResponse.json({
      error: "Error on '/api/recommendation': " + err,
      status: 400,
    })
  }
}
