import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const { likedToId } = await req.json();

    if (!likedToId) {
      return NextResponse.json(
        { message: "LikedToId not provided." },
        { status: 400 }
      );
    }

    const likedToUser = await prisma.user.findUnique({
      where: { id: likedToId },
    });

    if (!likedToUser) {
      return NextResponse.json(
        { message: "User to be liked not found." },
        { status: 404 }
      );
    }

    const existingLike = await prisma.like.findFirst({
      where: {
        likerId: session.user.id,
        likedToId,
      },
    });

    if (!existingLike) {
      await prisma.like.create({
        data: {
          likerId: session?.user?.id,
          likedToId,
        },
      });
      return NextResponse.json(
        { message: "Profile successfully liked!" },
        { status: 200 }
      );
    } else {
      await prisma.like.delete({
        where: {
          id: existingLike.id, 
        },
      });
      return NextResponse.json(
        { message: "Profile removed from liked!" },
        { status: 200 }
      );
    }
  } catch (error : any) {
    console.log(error.message);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
