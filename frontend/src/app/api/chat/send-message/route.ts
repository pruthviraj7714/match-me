import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { chatId, senderId, message } = await req.json();

    if (!chatId || !senderId) {
      return NextResponse.json(
        {
          message: "ChatId or Sender Id not found!",
        },
        { status: 400 }
      );
    }

    if (!message) {
      return NextResponse.json(
        {
          message: "Message not found!",
        },
        { status: 400 }
      );
    }

    const msg = await prisma.message.create({
      data: {
        content: message,
        chatId,
        senderId,
        deliveredAt: new Date(),
      },
    });

    return NextResponse.json({
      message: "Message successfully deliverd",
      msg,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Intenal Server Error",
      },
      { status: 500 }
    );
  }
}
