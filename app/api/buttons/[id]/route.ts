import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { Button, ButtonSchema } from "@/app/lib/prisma-definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const button = await prisma.button.findFirstOrThrow({
      where: {
        id,
      },
    });
    return NextResponse.json({ button }, { status: 200 });
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
    const requestData: Button = ButtonSchema.parse(response);
    if (requestData != null) {
      const button = await prisma.button.update({
        data: {
          name: requestData.name,
          styleID: requestData.styleID,
          pronunciation: requestData.pronunciation,
          definition: requestData.definition,
          languageID: requestData.languageID,
          folderID: requestData.folderID,
        },
        where: {
          id,
        },
      });
      return NextResponse.json({ button }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Invalid Input: Button Data" },
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
    const button = await prisma.button.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ button }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
