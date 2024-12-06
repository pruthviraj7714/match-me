import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart } from "lucide-react";
import MemberCard from "@/components/MemberCard";
import { fetchLikedUsers, fetchUsersLikedMe } from "@/actions/likeActions";

export default async function ListPage() {
  const likedToUsers = await fetchLikedUsers();
  const likedToMeUsers = await fetchUsersLikedMe();

  return (
    <div className="container mx-auto py-8 px-4">
      <Tabs defaultValue="likedByMe" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="likedByMe" className="text-lg">
            <Heart className="w-5 h-5 mr-2" />
            Members I Have Liked
          </TabsTrigger>
          <TabsTrigger value="likers" className="text-lg">
            <Heart className="w-5 h-5 mr-2" />
            Members that Like Me
          </TabsTrigger>
        </TabsList>
        <TabsContent value="likedByMe">
          <h2 className="text-2xl font-bold mb-6">Members I Have Liked</h2>
          {likedToUsers.length > 0 ? (
            <div className="grid grid-cols-4">
              {likedToUsers.map((u: any) => (
                <MemberCard key={u?.id} member={u?.likedTo} />
              ))}
            </div>
          ) : (
            <p>No liked members found.</p>
          )}
        </TabsContent>
        <TabsContent value="likers">
          <h2 className="text-2xl font-bold mb-6">Members that Like Me</h2>
          {likedToMeUsers.length > 0 ? (
            <div className="grid grid-cols-4">
              {likedToMeUsers.map((u: any) => (
                <MemberCard key={u.id} member={u.liker} />
              ))}
            </div>
          ) : (
            <p>No members liked you yet.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
