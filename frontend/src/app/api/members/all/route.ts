import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req : NextRequest) {
    const session = await getServerSession(authOptions);

    if(!session || !session.user) {
        return NextResponse.json({
            message : "User not found!"
        }, { status : 403})
    }
    
    try {
        const users = await prisma.user.findMany({});
        return NextResponse.json({
            members : users.filter((user) => user.id !== session.user.id)
        })
    } catch (error) {
        return NextResponse.json({
            message : "Internal Server Error"
        }, { status :500})
    }

}