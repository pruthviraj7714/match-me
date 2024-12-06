import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      {
        message: "Unauthorized, User not found!",
      },
      { status: 403 }
    );
  }

  const { recieverId } = await req.json();

  if (!recieverId) {
    return NextResponse.json(
      {
        message: "Reciever Id not found!",
      },
      { status: 400 }
    );
  }

  try {
    const chat = await prisma.chat.findFirst({
      where: {
        OR: [
          { AND: [{ user1Id: session.user.id }, { user2Id: recieverId }] },
          { AND: [{ user1Id: recieverId }, { user2Id: session.user.id }] },
        ],
      },
    });

    if (!chat) {
      const newChat = await prisma.chat.create({
        data: {
          user1Id: session.user.id,
          user2Id: recieverId,
        },
      });

      return NextResponse.json({
        message: "New Conversation Intiated Successfully",
        id: newChat.id,
      });
    } else {
      return NextResponse.json({
        id: chat.id,
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
