export const revalidate = 0; // Disable caching

import prisma from "@/lib/db";

export async function getMemberDetails(userId: string) {
  try {
    return await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
  } catch (error: any) {
    throw Error(error.message);
  }
}
