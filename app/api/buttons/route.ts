import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { Button, ButtonSchema } from "@/app/lib/prisma-definitions";

export async function GET(request: NextRequest) {
  try {
    const buttons = await prisma.button.findMany();
    return NextResponse.json({ buttons }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    const requestData: Button = ButtonSchema.parse(response);
    if (requestData != null) {
      const button = await prisma.button.create({
        data: {
          name: requestData.name,
          styleID: requestData.styleID,
          pronunciation: requestData.pronunciation,
          definition: requestData.definition,
          languageID: requestData.languageID,
          folderID: requestData.folderID,
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

export async function DELETE(request: NextRequest) {
  try {
    const buttons = await prisma.button.deleteMany();
    return NextResponse.json({ buttons }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
