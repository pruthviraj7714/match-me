import prisma from "../src/lib/db";
import MEMBERS_DATA, { Member } from "./memberData";
import bcrypt from "bcrypt";

export async function seedMembers() {
  return Promise.all(
    MEMBERS_DATA.map(async (member: Member) =>
      prisma.user.create({
        data: {
          name: member.name,
          username: member.username,
          bio: member.bio,
          country: member.country,
          gender: member.gender,
          profilePicture: member.image,
          password: await bcrypt.hash(member.password, 10),
          interests: member.interests,
          dateOfBirth: member.dateOfBirth,
        },
      })
    )
  );
}

async function main() {
  try {
    await seedMembers();
    console.log("Members seeded successfully!");
  } catch (error) {
    console.error("Error seeding members:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();