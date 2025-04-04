import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { Folder, FolderSchema } from "@/app/lib/prisma-definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const folder = await prisma.folder.findFirstOrThrow({
      where: {
        id,
      },
    });
    return NextResponse.json({ folder }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const response = await request.json();
    const requestData: Folder = FolderSchema.parse(response);
    if (requestData != null) {
      const folder = await prisma.folder.update({
        data: {
          name: requestData.name,
          styleID: requestData.styleID,
          boardID: requestData.boardID,
          parentID: requestData.parentID,
        },
        where: {
          id,
        },
      });
      return NextResponse.json({ folder }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Invalid Input: Folder Data" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const folder = await prisma.folder.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ folder }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
