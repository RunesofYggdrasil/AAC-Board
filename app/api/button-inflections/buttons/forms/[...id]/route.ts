import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string[] }> }
) {
  try {
    const buttonID = Number.parseInt((await params).id[0]);
    const formIDs = (await params).id.slice(1).map((value) => {
      return Number.parseInt(value);
    });

    const buttonInflectionIDs = await prisma.buttonInflection.findMany({
      where: {
        buttonID,
      },
      select: {
        id: true,
      },
    });
    let buttonInflectionIndices: number[] = buttonInflectionIDs.map(
      ({ id }) => {
        return id;
      }
    );

    // Find the ButtonInflectionsOnInflectionForms IDs that apply to the given Button ID
    let buttonInflectionsOnInflectionFormsIDs =
      await prisma.buttonInflectionsOnInflectionForms.findMany({
        where: {
          buttonID: {
            in: buttonInflectionIndices,
          },
        },
        select: {
          id: true,
        },
      });
    // Get the list of ButtonInflectionsOnInflectionForms IDs in order to search only within the group that apply to the given Button ID
    let buttonInflectionsOnInflectionFormsIndices: number[] =
      buttonInflectionsOnInflectionFormsIDs.map(({ id }) => {
        return id;
      });

    for (let i = 0; i < formIDs.length; i++) {
      const formID = formIDs[i];
      if (buttonInflectionsOnInflectionFormsIndices.length > 0) {
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
      } else {
        if (i == 0) {
          return NextResponse.json(
            { message: "Invalid Input: Button Data" },
            { status: 400 }
          );
        } else {
          return NextResponse.json(
            { message: "Invalid Input: InflectionForm Data" },
            { status: 400 }
          );
        }
      }
    }

    if (buttonInflectionsOnInflectionFormsIndices.length > 0) {
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
      buttonInflectionIndices = buttonInflectionsOnInflectionFormsButtonIDs.map(
        ({ buttonID }) => {
          return buttonID;
        }
      );
      const buttonInflections = await prisma.buttonInflection.findMany({
        where: {
          id: {
            in: buttonInflectionIndices,
          },
        },
      });
      return NextResponse.json({ buttonInflections }, { status: 200 });
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
  { params }: { params: Promise<{ id: string[] }> }
) {
  try {
    const buttonID = Number.parseInt((await params).id[0]);
    const formIDs = (await params).id.slice(1).map((value) => {
      return Number.parseInt(value);
    });

    const buttonInflectionIDs = await prisma.buttonInflection.findMany({
      where: {
        buttonID,
      },
      select: {
        id: true,
      },
    });
    let buttonInflectionIndices: number[] = buttonInflectionIDs.map(
      ({ id }) => {
        return id;
      }
    );

    // Find the ButtonInflectionsOnInflectionForms IDs that apply to the given Button ID
    let buttonInflectionsOnInflectionFormsIDs =
      await prisma.buttonInflectionsOnInflectionForms.findMany({
        where: {
          buttonID: {
            in: buttonInflectionIndices,
          },
        },
        select: {
          id: true,
        },
      });
    // Get the list of ButtonInflectionsOnInflectionForms IDs in order to search only within the group that apply to the given Button ID
    let buttonInflectionsOnInflectionFormsIndices: number[] =
      buttonInflectionsOnInflectionFormsIDs.map(({ id }) => {
        return id;
      });

    for (let i = 0; i < formIDs.length; i++) {
      const formID = formIDs[i];
      if (buttonInflectionsOnInflectionFormsIndices.length > 0) {
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
      } else {
        if (i == 0) {
          return NextResponse.json(
            { message: "Invalid Input: Button Data" },
            { status: 400 }
          );
        } else {
          return NextResponse.json(
            { message: "Invalid Input: InflectionForm Data" },
            { status: 400 }
          );
        }
      }
    }

    if (buttonInflectionsOnInflectionFormsIndices.length > 0) {
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
      buttonInflectionIndices = buttonInflectionsOnInflectionFormsButtonIDs.map(
        ({ buttonID }) => {
          return buttonID;
        }
      );
      const buttonInflections = await prisma.buttonInflection.deleteMany({
        where: {
          id: {
            in: buttonInflectionIndices,
          },
        },
      });
      return NextResponse.json({ buttonInflections }, { status: 200 });
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
