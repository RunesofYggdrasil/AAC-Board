import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { Settings, SettingsSchema } from "@/app/lib/prisma-definitions";

export async function GET(request: NextRequest) {
  try {
    const settingss = await prisma.settings.findMany();
    return NextResponse.json({ settingss }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    const requestData: Settings = SettingsSchema.parse(response);
    if (requestData != null) {
      const settings = await prisma.settings.create({
        data: {
          contrast: requestData.contrast,
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

export async function DELETE(request: NextRequest) {
  try {
    const settingss = await prisma.settings.deleteMany();
    return NextResponse.json({ settingss }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
