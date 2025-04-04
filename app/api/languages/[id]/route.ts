import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { Language, LanguageSchema } from "@/app/lib/prisma-definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const language = await prisma.language.findFirstOrThrow({
      where: {
        id,
      },
    });
    return NextResponse.json({ language }, { status: 200 });
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
    const requestData: Language = LanguageSchema.parse(response);
    if (requestData != null) {
      const language = await prisma.language.update({
        data: {
          name: requestData.name,
          direction: requestData.direction,
        },
        where: {
          id,
        },
      });
      return NextResponse.json({ language }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Invalid Input: Language Data" },
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
    const language = await prisma.language.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ language }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
