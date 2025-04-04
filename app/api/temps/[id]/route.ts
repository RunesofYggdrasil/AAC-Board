import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { Template, TemplateSchema } from "@/app/lib/prisma-definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const template = await prisma.template.findFirstOrThrow({
      where: {
        id,
      },
    });
    return NextResponse.json({ template }, { status: 200 });
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
    const requestData: Template = TemplateSchema.parse(response);
    if (requestData != null) {
      const template = await prisma.template.update({
        data: {},
        where: {
          id,
        },
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const template = await prisma.template.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ template }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
