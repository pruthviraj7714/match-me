import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: NextRequest) {
  const messageId = req.nextUrl.searchParams.get("messageId");

  if (!messageId) {
    return NextResponse.json({
      message: "Message Id is missing!",
    });
  }

  try {
    await prisma.message.update({
      where: {
        id: messageId,
      },
      data: {
        isRead: true,
      },
    });

    return NextResponse.json(
      {
        message: "Message successfully Read!",
      },
      { status: 200 }
    );
    
  } catch (error) {
    return NextResponse.json({
      message: "Internal Server Error",
    });
  }
}
