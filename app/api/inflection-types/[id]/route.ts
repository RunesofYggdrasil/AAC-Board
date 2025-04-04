import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import {
  InflectionType,
  InflectionTypeSchema,
} from "@/app/lib/prisma-definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const inflectionType = await prisma.inflectionType.findFirstOrThrow({
      where: {
        id,
      },
    });
    return NextResponse.json({ inflectionType }, { status: 200 });
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
    const requestData: InflectionType = InflectionTypeSchema.parse(response);
    if (requestData != null) {
      const inflectionType = await prisma.inflectionType.update({
        data: {
          name: requestData.name,
          languageID: requestData.languageID,
        },
        where: {
          id,
        },
      });
      return NextResponse.json({ inflectionType }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Invalid Input: InflectionType Data" },
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
    const inflectionType = await prisma.inflectionType.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ inflectionType }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
