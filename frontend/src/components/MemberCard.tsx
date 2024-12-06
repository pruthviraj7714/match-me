import Image from "next/image";
import { UserProps } from "@/types/user.types";
import { calculateAge } from "@/actions/actions";
import Link from "next/link";

export default function MemberCard({ member }: { member: UserProps }) {
  return (
    <Link
      href={`/members/${member.id}`}
      className="relative h-60 w-60 overflow-hidden rounded-xl transition-all duration-300 ease-in-out hover:scale-105"
    >
      <div className="inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <Image
        src={member.profilePicture}
        alt={`Profile picture of ${member.name}`}
        width={250}
        height={250}
        className="transition-all duration-300 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/20 backdrop-blur-0 transition-all duration-300 ease-in-out group-hover:bg-black/30" />
      <div className="absolute bottom-4 left-4 right-4 flex flex-col transition-all duration-300 ease-in-out group-hover:translate-y-[-4px]">
        <h3 className="text-xl font-bold text-white">
          {member.name}, {calculateAge(member.dateOfBirth)}
        </h3>
        <p className="font-mono text-sm text-gray-300">{member.country}</p>
      </div>
    </Link>
  );
}
