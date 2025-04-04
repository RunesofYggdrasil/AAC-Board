import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import {
  InflectionForm,
  InflectionFormSchema,
} from "@/app/lib/prisma-definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const inflectionForm = await prisma.inflectionForm.findFirstOrThrow({
      where: {
        id,
      },
    });
    return NextResponse.json({ inflectionForm }, { status: 200 });
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
    const requestData: InflectionForm = InflectionFormSchema.parse(response);
    if (requestData != null) {
      const inflectionForm = await prisma.inflectionForm.update({
        data: {
          name: requestData.name,
          typeID: requestData.typeID,
        },
        where: {
          id,
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const inflectionForm = await prisma.inflectionForm.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ inflectionForm }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
