import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { Tag, TagSchema } from "@/app/lib/prisma-definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const tag = await prisma.tag.findFirstOrThrow({
      where: {
        id,
      },
    });
    return NextResponse.json({ tag }, { status: 200 });
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
    const requestData: Tag = TagSchema.parse(response);
    if (requestData != null) {
      try {
        const duplicate = await prisma.tag.findUniqueOrThrow({
          where: {
            unique_tag_name: {
              name: requestData.name,
              boardID: requestData.boardID,
            },
            NOT: {
              id,
            },
          },
        });
        return NextResponse.json(
          { message: "Invalid Input: Duplicate Tag Data" },
          { status: 400 }
        );
      } catch (error) {
        const tag = await prisma.tag.update({
          data: {
            name: requestData.name,
            boardID: requestData.boardID,
          },
          where: {
            id,
          },
        });
        return NextResponse.json({ tag }, { status: 200 });
      }
    } else {
      return NextResponse.json(
        { message: "Invalid Input: Tag Data" },
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
    const tag = await prisma.tag.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ tag }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
