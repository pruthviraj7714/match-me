"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { LucideLoader2, MessageCircleHeartIcon } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

const ChatButton = ({ recieverId }: { recieverId: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const createOrNavigateToChat = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/chat/create-or-navigate", {
        recieverId,
      });
      console.log(res.data);
      router.push(`/chat/${res.data.id}`);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      disabled={isLoading}
      onClick={createOrNavigateToChat}
      className="flex items-center gap-1.5 !bg-green-500 hover:!bg-green-600 disabled:bg-gray-500 disabled:text-black"
    >
      {isLoading ? (
        <div className="px-5 py-2">
          <LucideLoader2 className="animate-spin size-10" />
        </div>
      ) : (
        <div className="flex items-center gap-1.5">
          <MessageCircleHeartIcon className="size-10" />
          <span className="font-bold text-lg">Chat</span>
        </div>
      )}
    </Button>
  );
};

export default ChatButton;
