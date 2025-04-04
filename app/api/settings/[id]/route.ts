import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { Settings, SettingsSchema } from "@/app/lib/prisma-definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const settings = await prisma.settings.findFirstOrThrow({
      where: {
        id,
      },
    });
    return NextResponse.json({ settings }, { status: 200 });
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
    const requestData: Settings = SettingsSchema.parse(response);
    if (requestData != null) {
      const settings = await prisma.settings.update({
        data: {
          contrast: requestData.contrast,
        },
        where: {
          id,
        },
      });
      return NextResponse.json({ settings }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Invalid Input: Settings Data" },
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
    const settings = await prisma.settings.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ settings }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
