import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { Board, BoardSchema } from "@/app/lib/prisma-definitions";

export async function GET(request: NextRequest) {
  try {
    const boards = await prisma.board.findMany();
    return NextResponse.json({ boards }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    const requestData: Board = BoardSchema.parse(response);
    if (requestData != null) {
      const board = await prisma.board.create({
        data: {},
      });
      return NextResponse.json({ board }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Invalid Input: Board Data" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const boards = await prisma.board.deleteMany();
    return NextResponse.json({ boards }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
