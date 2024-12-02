import prisma from "@/lib/db";
import { differenceInYears } from "date-fns";

export function calculateAge(dateOfBirth: string) {
  const today = new Date();
  return differenceInYears(today, new Date(dateOfBirth));
}

export const fetchUserInfo = async (userId: string): Promise<any | null> => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      include : {
        likesGiven : true,
        likesReceived : true
      }
    });

    if (!user) {
      throw new Error("User not found!");
    }

    return user;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw new Error("Failed to fetch user info. Please try again later.");
  }
};
