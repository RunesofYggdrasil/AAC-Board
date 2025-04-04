import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import {
  ButtonsOnTags,
  ButtonsOnTagsSchema,
} from "@/app/lib/prisma-definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const buttonsOnTags = await prisma.buttonsOnTags.findFirstOrThrow({
      where: {
        id,
      },
    });
    return NextResponse.json({ buttonsOnTags }, { status: 200 });
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
    const requestData: ButtonsOnTags = ButtonsOnTagsSchema.parse(response);
    if (requestData != null) {
      const buttonsOnTags = await prisma.buttonsOnTags.update({
        data: {
          buttonID: requestData.buttonID,
          tagID: requestData.tagID,
        },
        where: {
          id,
        },
      });
      return NextResponse.json({ buttonsOnTags }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Invalid Input: ButtonsOnTags Data" },
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
    const buttonsOnTags = await prisma.buttonsOnTags.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ buttonsOnTags }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
