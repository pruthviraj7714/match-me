"use client";

import { toast } from "sonner";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { MessageSquare, Search, Plus } from "lucide-react";
import ConversationCard from "@/components/ConversationCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { ChatProps } from "@/types/chat.types";

export default function MessagesPage() {
  const [conversations, setConversations] = useState<ChatProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();
  const session = useSession();

  const fetchAllChats = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/chat/all");
      setConversations(res.data.chats);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllChats();
  }, []);

  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.user1.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      conversation.user2.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-full md:w-1/3 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-primary">Messages</h2>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="p-4 border-b border-gray-200">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 mt-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))
          ) : filteredConversations.length > 0 ? (
            filteredConversations.map((conversation: ChatProps) => (
              <ConversationCard
                conversation={conversation}
                key={conversation.id}
                recipientUser={
                  conversation.user1.id !== session.data?.user.id
                    ? conversation.user1.id
                    : conversation.user2.id
                }
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <MessageSquare size={48} />
              <p className="mt-2">No conversations found</p>
            </div>
          )}
        </div>
        <div className="p-4 border-t border-gray-200">
          <Button
            onClick={() => {
              router.push("/members");
            }}
            className="w-full"
          >
            <Plus size={18} className="mr-2" />
            New Conversation
          </Button>
        </div>
      </div>
      <div className="hidden md:flex md:flex-1 items-center justify-center bg-gray-50">
        <div className="text-center">
          <MessageSquare size={64} className="mx-auto text-gray-400" />
          <h3 className="mt-4 text-xl font-semibold text-gray-700">
            Select a conversation
          </h3>
          <p className="mt-2 text-gray-500">
            Choose a conversation from the list to start chatting
          </p>
        </div>
      </div>
    </div>
  );
}
