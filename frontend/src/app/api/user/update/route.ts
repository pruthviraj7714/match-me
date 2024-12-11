import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { MemberEditSchema } from "@/types/schemas";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        {
          message: "Unauthorized, User not found",
        },
        { status: 403 }
      );
    }

    const parsedBody = MemberEditSchema.safeParse(await req.json());

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          message: "Invalid Inputs",
        },
        { status: 400 }
      );
    }

    const { name, bio, country, interests } = parsedBody.data;

    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        bio,
        country,
        interests,
        name,
      },
    });

    return NextResponse.json(
      {
        message: "User Profile Successfully Updated!",
        user
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
