import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { Style, StyleSchema } from "@/app/lib/prisma-definitions";

export async function GET(request: NextRequest) {
  try {
    const styles = await prisma.style.findMany();
    return NextResponse.json({ styles }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    const requestData: Style = StyleSchema.parse(response);
    if (requestData != null) {
      const style = await prisma.style.create({
        data: {
          image: requestData.image,
          format: requestData.format,
          fontSize: requestData.fontSize,
          backgroundColor: requestData.backgroundColor,
          textColor: requestData.textColor,
          borderColor: requestData.borderColor,
          borderWeight: requestData.borderWeight,
          rowStart: requestData.rowStart,
          rowExtend: requestData.rowExtend,
          colStart: requestData.colStart,
          colExtend: requestData.colExtend,
        },
      });
      return NextResponse.json({ style }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Invalid Input: Style Data" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const styles = await prisma.style.deleteMany();
    return NextResponse.json({ styles }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
