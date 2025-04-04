import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import {
  ButtonsOnTags,
  ButtonsOnTagsSchema,
} from "@/app/lib/prisma-definitions";

export async function GET(request: NextRequest) {
  try {
    const buttonsOnTagss = await prisma.buttonsOnTags.findMany();
    return NextResponse.json({ buttonsOnTagss }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    const requestData: ButtonsOnTags = ButtonsOnTagsSchema.parse(response);
    if (requestData != null) {
      const buttonsOnTags = await prisma.buttonsOnTags.create({
        data: {
          buttonID: requestData.buttonID,
          tagID: requestData.tagID,
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

export async function DELETE(request: NextRequest) {
  try {
    const buttonsOnTagss = await prisma.buttonsOnTags.deleteMany();
    return NextResponse.json({ buttonsOnTagss }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
