import { fetchUserInfo } from "@/actions/actions";
import LikeButton from "@/components/LikeButton";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { CalendarDays, MapPin, MessageCircleHeartIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";

interface LikeProps {
  id: string;
  likerId: string;
  likedToId: string;
  createdAt: Date;
}

export interface UserProps {
  id: string;
  name: string;
  username: string;
  password: string;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
  bio: string;
  dateOfBirth: string;
  country: string;
  interests: string[];
  gender: "MALE" | "FEMALE";
  likesGiven: LikeProps[];
  likesReceived: LikeProps[];
}

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params).userId;
  const user = await fetchUserInfo(userId);
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="relative h-64 sm:h-80">
          <Image
            src={user.profilePicture}
            alt={user.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              {user.name}, {user.age}
            </h1>
            <span className="px-3 py-1 text-sm font-semibold text-pink-600 bg-pink-100 rounded-full">
              {user.gender}
            </span>
          </div>
          <p className="mt-2 text-gray-600">@{user.username}</p>
          <p className="mt-4 text-lg text-gray-700">{user.bio}</p>
          <div className="mt-6 flex items-center text-gray-600">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{user.country}</span>
          </div>
          <div className="mt-2 flex items-center text-gray-600">
            <CalendarDays className="h-5 w-5 mr-2" />
            <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900">Interests</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {user.interests.map((interest: string) => (
                <span
                  key={interest}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="px-7 py-2 flex justify-between items-center">
          <LikeButton
            userId={userId}
            isLiked={user?.likesReceived.some(
              (u: LikeProps) => u.likerId === session?.user.id
            )}
          />
          <Button className="flex items-center gap-1.5 !bg-green-500 hover:!bg-green-600">
            <MessageCircleHeartIcon size={35} />
            <span className="font-bold text-lg">Chat</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
