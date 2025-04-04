import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import {
  InflectionForm,
  InflectionFormSchema,
} from "@/app/lib/prisma-definitions";

export async function GET(request: NextRequest) {
  try {
    const inflectionForms = await prisma.inflectionForm.findMany();
    return NextResponse.json({ inflectionForms }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    const requestData: InflectionForm = InflectionFormSchema.parse(response);
    if (requestData != null) {
      const inflectionForm = await prisma.inflectionForm.create({
        data: {
          name: requestData.name,
          typeID: requestData.typeID,
        },
      });
      return NextResponse.json({ inflectionForm }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Invalid Input: InflectionForm Data" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const inflectionForms = await prisma.inflectionForm.deleteMany();
    return NextResponse.json({ inflectionForms }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
