import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { Folder, FolderSchema } from "@/app/lib/prisma-definitions";

export async function GET(request: NextRequest) {
  try {
    const folders = await prisma.folder.findMany();
    return NextResponse.json({ folders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    const requestData: Folder = FolderSchema.parse(response);
    if (requestData != null) {
      const folder = await prisma.folder.create({
        data: {
          name: requestData.name,
          styleID: requestData.styleID,
          boardID: requestData.boardID,
          parentID: requestData.parentID,
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

export async function DELETE(request: NextRequest) {
  try {
    const folders = await prisma.folder.deleteMany();
    return NextResponse.json({ folders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
