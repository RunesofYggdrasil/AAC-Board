import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string[] }> }
) {
  try {
    const formIDs = (await params).id.map((value) => {
      return Number.parseInt(value);
    });

    // Find all ButtonInflectionsOnInflectionForms IDs
    let buttonInflectionsOnInflectionFormsIDs =
      await prisma.buttonInflectionsOnInflectionForms.findMany({
        select: {
          id: true,
        },
      });
    // Get the list of ButtonInflectionsOnInflectionForms IDs in order to create a search group for narrowing down later
    let buttonInflectionsOnInflectionFormsIndices: number[] =
      buttonInflectionsOnInflectionFormsIDs.map(({ id }) => {
        return id;
      });

    for (let i = 0; i < formIDs.length; i++) {
      const formID = formIDs[i];
      // Progressively narrow down the list of ButtonInflectionsOnInflectionForms IDs to the ones that contain each InflectionForm ID by
      //  searching within the current list of ButtonInflectionsOnInflectionForms IDs and finding all where the current InflectionForm ID applies
      buttonInflectionsOnInflectionFormsIDs =
        await prisma.buttonInflectionsOnInflectionForms.findMany({
          where: {
            id: {
              in: buttonInflectionsOnInflectionFormsIndices,
            },
            formID,
          },
          select: {
            id: true,
          },
        });
      // Save the new, smaller or equal list of ButtonInflectionsOnInflectionForms IDs to the indices list so that only the ones that meet all
      //  previous conditions are searched
      buttonInflectionsOnInflectionFormsIndices =
        buttonInflectionsOnInflectionFormsIDs.map(({ id }) => {
          return id;
        });
    }

    // Use the final list of ButtonInflectionsOnInflectionForms IDs to get all of the ButtonInflection IDs
    const buttonInflectionsOnInflectionFormsButtonIDs =
      await prisma.buttonInflectionsOnInflectionForms.findMany({
        where: {
          id: {
            in: buttonInflectionsOnInflectionFormsIndices,
          },
        },
        select: {
          buttonID: true,
        },
      });
    const buttonInflectionIndices: number[] =
      buttonInflectionsOnInflectionFormsButtonIDs.map(({ buttonID }) => {
        return buttonID;
      });
    const buttonInflections = await prisma.buttonInflection.findMany({
      where: {
        id: {
          in: buttonInflectionIndices,
        },
      },
    });
    return NextResponse.json({ buttonInflections }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string[] }> }
) {
  try {
    const formIDs = (await params).id.map((value) => {
      return Number.parseInt(value);
    });

    // Find all ButtonInflectionsOnInflectionForms IDs
    let buttonInflectionsOnInflectionFormsIDs =
      await prisma.buttonInflectionsOnInflectionForms.findMany({
        select: {
          id: true,
        },
      });
    // Get the list of ButtonInflectionsOnInflectionForms IDs in order to create a search group for narrowing down later
    let buttonInflectionsOnInflectionFormsIndices: number[] =
      buttonInflectionsOnInflectionFormsIDs.map(({ id }) => {
        return id;
      });

    for (let i = 0; i < formIDs.length; i++) {
      const formID = formIDs[i];
      // Progressively narrow down the list of ButtonInflectionsOnInflectionForms IDs to the ones that contain each InflectionForm ID by
      //  searching within the current list of ButtonInflectionsOnInflectionForms IDs and finding all where the current InflectionForm ID applies
      buttonInflectionsOnInflectionFormsIDs =
        await prisma.buttonInflectionsOnInflectionForms.findMany({
          where: {
            id: {
              in: buttonInflectionsOnInflectionFormsIndices,
            },
            formID,
          },
          select: {
            id: true,
          },
        });
      // Save the new, smaller or equal list of ButtonInflectionsOnInflectionForms IDs to the indices list so that only the ones that meet all
      //  previous conditions are searched
      buttonInflectionsOnInflectionFormsIndices =
        buttonInflectionsOnInflectionFormsIDs.map(({ id }) => {
          return id;
        });
    }

    // Use the final list of ButtonInflectionsOnInflectionForms IDs to get all of the ButtonInflection IDs
    const buttonInflectionsOnInflectionFormsButtonIDs =
      await prisma.buttonInflectionsOnInflectionForms.findMany({
        where: {
          id: {
            in: buttonInflectionsOnInflectionFormsIndices,
          },
        },
        select: {
          buttonID: true,
        },
      });
    const buttonInflectionIndices: number[] =
      buttonInflectionsOnInflectionFormsButtonIDs.map(({ buttonID }) => {
        return buttonID;
      });
    const buttonInflections = await prisma.buttonInflection.deleteMany({
      where: {
        id: {
          in: buttonInflectionIndices,
        },
      },
    });
    return NextResponse.json({ buttonInflections }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
