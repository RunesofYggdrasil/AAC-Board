import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import {
  ButtonInflection,
  ButtonInflectionSchema,
} from "@/app/lib/prisma-definitions";

export async function GET(request: NextRequest) {
  try {
    const buttonInflections = await prisma.buttonInflection.findMany();
    return NextResponse.json({ buttonInflections }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    const requestData: ButtonInflection =
      ButtonInflectionSchema.parse(response);
    if (requestData != null) {
      const buttonInflection = await prisma.buttonInflection.create({
        data: {
          inflection: requestData.inflection,
          buttonID: requestData.buttonID,
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

export async function DELETE(request: NextRequest) {
  try {
    const buttonInflections = await prisma.buttonInflection.deleteMany();
    return NextResponse.json({ buttonInflections }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
