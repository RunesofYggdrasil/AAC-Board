import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { Language, LanguageSchema } from "@/app/lib/prisma-definitions";

export async function GET(request: NextRequest) {
  try {
    const languages = await prisma.language.findMany();
    return NextResponse.json({ languages }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    const requestData: Language = LanguageSchema.parse(response);
    if (requestData != null) {
      const language = await prisma.language.create({
        data: {
          name: requestData.name,
          direction: requestData.direction,
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

export async function DELETE(request: NextRequest) {
  try {
    const languages = await prisma.language.deleteMany();
    return NextResponse.json({ languages }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
