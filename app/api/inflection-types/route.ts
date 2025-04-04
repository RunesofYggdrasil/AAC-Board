import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import {
  InflectionType,
  InflectionTypeSchema,
} from "@/app/lib/prisma-definitions";

export async function GET(request: NextRequest) {
  try {
    const inflectionTypes = await prisma.inflectionType.findMany();
    return NextResponse.json({ inflectionTypes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    const requestData: InflectionType = InflectionTypeSchema.parse(response);
    if (requestData != null) {
      const inflectionType = await prisma.inflectionType.create({
        data: {
          name: requestData.name,
          languageID: requestData.languageID,
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

export async function DELETE(request: NextRequest) {
  try {
    const inflectionTypes = await prisma.inflectionType.deleteMany();
    return NextResponse.json({ inflectionTypes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
