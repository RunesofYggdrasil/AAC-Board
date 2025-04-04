import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import {
  ButtonInflectionsOnInflectionForms,
  ButtonInflectionsOnInflectionFormsSchema,
} from "@/app/lib/prisma-definitions";

export async function GET(request: NextRequest) {
  try {
    const buttonInflectionsOnInflectionFormss =
      await prisma.buttonInflectionsOnInflectionForms.findMany();
    return NextResponse.json(
      { buttonInflectionsOnInflectionFormss },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    const requestData: ButtonInflectionsOnInflectionForms =
      ButtonInflectionsOnInflectionFormsSchema.parse(response);
    if (requestData != null) {
      const buttonInflectionsOnInflectionForms =
        await prisma.buttonInflectionsOnInflectionForms.create({
          data: {
            buttonID: requestData.buttonID,
            formID: requestData.formID,
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

export async function DELETE(request: NextRequest) {
  try {
    const buttonInflectionsOnInflectionFormss =
      await prisma.buttonInflectionsOnInflectionForms.deleteMany();
    return NextResponse.json(
      { buttonInflectionsOnInflectionFormss },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
