import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";


export const fetchPrevMessages = async ({chatId} : {chatId : string})  => {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
        throw new Error("User not found!");
      }
    
    try {
        const messages = await prisma.chat.findFirst({
            where : {
                id : chatId
            },
            include : {
                messages : true,
                user1 : true,
                user2 : true
            }
        })

        return messages;

    } catch (error) {
        throw new Error("Internal Server Error");
    }
}