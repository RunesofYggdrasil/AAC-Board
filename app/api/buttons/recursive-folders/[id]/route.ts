import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { Button } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const folders = await prisma.folder.findMany({
      where: {
        id,
      },
    });
    const buttons: Button[] = [];
    while (folders.length > 0) {
      const currentFolder = folders.pop()!;
      const folderID = currentFolder.id;
      const childFolders = await prisma.folder.findMany({
        where: {
          parentID: folderID,
        },
      });
      folders.concat(childFolders);
      const folderButtons = await prisma.button.findMany({
        where: {
          folderID,
        },
      });
      buttons.concat(folderButtons);
    }
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
    const id = Number.parseInt((await params).id);
    const folders = await prisma.folder.findMany({
      where: {
        id,
      },
    });
    const buttonIndices: number[] = [];
    while (folders.length > 0) {
      const currentFolder = folders.pop()!;
      const folderID = currentFolder.id;
      const childFolders = await prisma.folder.findMany({
        where: {
          parentID: folderID,
        },
      });
      folders.concat(childFolders);
      const folderButtons = await prisma.button.findMany({
        where: {
          folderID,
        },
        select: {
          id: true,
        },
      });
      const folderButtonIndices = folderButtons.map(({ id }) => {
        return id;
      });
      buttonIndices.concat(folderButtonIndices);
    }
    const buttons = await prisma.button.deleteMany({
      where: {
        id: {
          in: buttonIndices,
        },
      },
    });
    return NextResponse.json({ buttons }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
