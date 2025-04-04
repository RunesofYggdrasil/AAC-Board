import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import {
  ButtonInflection,
  ButtonInflectionSchema,
} from "@/app/lib/prisma-definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const buttonInflection = await prisma.buttonInflection.findFirstOrThrow({
      where: {
        id,
      },
    });
    return NextResponse.json({ buttonInflection }, { status: 200 });
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
    const requestData: ButtonInflection =
      ButtonInflectionSchema.parse(response);
    if (requestData != null) {
      const buttonInflection = await prisma.buttonInflection.update({
        data: {
          inflection: requestData.inflection,
          buttonID: requestData.buttonID,
        },
        where: {
          id,
        },
      });
      return NextResponse.json({ buttonInflection }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Invalid Input: ButtonInflection Data" },
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
    const buttonInflection = await prisma.buttonInflection.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ buttonInflection }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
