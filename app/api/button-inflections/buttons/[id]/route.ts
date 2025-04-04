import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const buttonID = Number.parseInt((await params).id);
    const buttonInflections = await prisma.buttonInflection.findMany({
      where: {
        buttonID,
      },
    });
    return NextResponse.json({ buttonInflections }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const buttonID = Number.parseInt((await params).id);
    const buttonInflections = await prisma.buttonInflection.deleteMany({
      where: {
        buttonID,
      },
    });
    return NextResponse.json({ buttonInflections }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
