import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { Style, StyleSchema } from "@/app/lib/prisma-definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const style = await prisma.style.findFirstOrThrow({
      where: {
        id,
      },
    });
    return NextResponse.json({ style }, { status: 200 });
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
    const requestData: Style = StyleSchema.parse(response);
    if (requestData != null) {
      const style = await prisma.style.update({
        data: {
          image: requestData.image,
          format: requestData.format,
          fontSize: requestData.fontSize,
          backgroundColor: requestData.backgroundColor,
          textColor: requestData.textColor,
          borderColor: requestData.borderColor,
          borderWeight: requestData.borderWeight,
          rowStart: requestData.rowStart,
          rowExtend: requestData.rowExtend,
          colStart: requestData.colStart,
          colExtend: requestData.colExtend,
        },
        where: {
          id,
        },
      });
      return NextResponse.json({ style }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Invalid Input: Style Data" },
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
    const style = await prisma.style.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ style }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
