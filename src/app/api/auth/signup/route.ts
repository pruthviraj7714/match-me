// import { NextRequest, NextResponse } from "next/server";
// import { hash } from "bcrypt"
// import prisma from "@/lib/db";

// export async function POST(req : NextRequest) {
//     const { name, username, password } = await req.json();

//     if(!name || !username || !password) {
//         return NextResponse.json({
//             message : "Invalid Inputs"
//         }, { status : 400})
//     }

//     try {
    
//         const hashedPassword = await hash(password, 10);

//         await prisma.user.create({
//             data : {
//                 name,
//                 username,
//                 password : hashedPassword,

//             }
//         })


//         return NextResponse.json({
//             message : "User Successfully Created"
//         })

//     } catch (error) {
//         return NextResponse.json({
//             message : "Internal Server Error"
//         }, { status : 500})
//     }
// }