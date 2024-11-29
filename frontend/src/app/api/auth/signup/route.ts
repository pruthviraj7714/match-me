import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import prisma from "@/lib/db";
import { RegisterSchema } from "@/types/schemas";

export async function POST(req: NextRequest) {
  const parsedBody = RegisterSchema.safeParse(await req.json());

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        message: "Invalid Inputs",
      },
      { status: 400 }
    );
  }

  try {
    const { gender, interests, name, password, username, bio, image, country, dateOfBirth } =
      parsedBody.data;

    const isUserAlreadyExists = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (isUserAlreadyExists) {
      return NextResponse.json(
        {
          message: "User with similar username Already Exists",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        username,
        password: hashedPassword,
        gender,
        bio,
        country,
        interests,
        profilePicture: image,
        dateOfBirth
      },
    });

    return NextResponse.json({
      message: "User Successfully Created",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
