import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const folderID = Number.parseInt((await params).id);
    const buttons = await prisma.button.findMany({
      where: {
        folderID,
      },
    });
    return NextResponse.json({ buttons }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const folderID = Number.parseInt((await params).id);
    const buttons = await prisma.button.deleteMany({
      where: {
        folderID,
      },
    });
    return NextResponse.json({ buttons }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
