import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { Template, TemplateSchema } from "@/app/lib/prisma-definitions";

export async function GET(request: NextRequest) {
  try {
    const templates = await prisma.template.findMany();
    return NextResponse.json({ templates }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    const requestData: Template = TemplateSchema.parse(response);
    if (requestData != null) {
      const template = await prisma.template.create({
        data: {},
      });
      return NextResponse.json({ template }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Invalid Input: Template Data" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const templates = await prisma.template.deleteMany();
    return NextResponse.json({ templates }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
