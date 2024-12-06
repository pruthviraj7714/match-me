import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export const fetchLikedUsers = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("User not found!");
  }

  try {
    const users = await prisma.like.findMany({
      where: {
        likerId: session.user?.id,
      },
      include : {
        likedTo : true
      }
    });

    return users;
  } catch (error) {
    throw new Error("Internal Server Error!");
  }
};

export const fetchUsersLikedMe = async () => {
    const session = await getServerSession(authOptions);
  
    if (!session || !session.user) {
      throw new Error("User not found!");
    }
  
    try {
      const users = await prisma.like.findMany({
        where: {
          likedToId: session.user?.id,
        },
        include : {
          liker : true
        }
      });
  
      return users;
    } catch (error) {
      throw new Error("Internal Server Error!");
    }
  };
  
