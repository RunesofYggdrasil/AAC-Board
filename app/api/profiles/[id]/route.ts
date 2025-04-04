import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { Profile, ProfileSchema } from "@/app/lib/prisma-definitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number.parseInt((await params).id);
    const profile = await prisma.profile.findFirstOrThrow({
      where: {
        id,
      },
    });
    return NextResponse.json({ profile }, { status: 200 });
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
    const requestData: Profile = ProfileSchema.parse(response);
    if (requestData != null) {
      try {
        const duplicate = await prisma.profile.findUniqueOrThrow({
          where: {
            unique_profile_name: {
              name: requestData.name,
              userID: requestData.userID,
            },
            NOT: {
              id,
            },
          },
        });
        return NextResponse.json(
          { message: "Invalid Input: Duplicate Profile Data" },
          { status: 400 }
        );
      } catch (error) {
        const profile = await prisma.profile.update({
          data: {
            name: requestData.name,
            default: requestData.default,
            userID: requestData.userID,
            settingsID: requestData.settingsID,
          },
          where: {
            id,
          },
        });
        return NextResponse.json({ profile }, { status: 200 });
      }
    } else {
      return NextResponse.json(
        { message: "Invalid Input: Profile Data" },
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
    const profile = await prisma.profile.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ profile }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
