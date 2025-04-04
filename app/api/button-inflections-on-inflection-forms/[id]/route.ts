import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import {
  ButtonInflectionsOnInflectionForms,
  ButtonInflectionsOnInflectionFormsSchema,
} from "@/app/lib/prisma-definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const buttonInflectionsOnInflectionForms =
      await prisma.buttonInflectionsOnInflectionForms.findFirstOrThrow({
        where: {
          id,
        },
      });
    return NextResponse.json(
      { buttonInflectionsOnInflectionForms },
      { status: 200 }
    );
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
    const requestData: ButtonInflectionsOnInflectionForms =
      ButtonInflectionsOnInflectionFormsSchema.parse(response);
    if (requestData != null) {
      const buttonInflectionsOnInflectionForms =
        await prisma.buttonInflectionsOnInflectionForms.update({
          data: {
            buttonID: requestData.buttonID,
            formID: requestData.formID,
          },
          where: {
            id,
          },
        });
      return NextResponse.json(
        { buttonInflectionsOnInflectionForms },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid Input: ButtonInflectionsOnInflectionForms Data" },
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
    const buttonInflectionsOnInflectionForms =
      await prisma.buttonInflectionsOnInflectionForms.delete({
        where: {
          id,
        },
      });
    return NextResponse.json(
      { buttonInflectionsOnInflectionForms },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
