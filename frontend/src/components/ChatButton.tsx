"use client"
import React from "react";
import { Button } from "./ui/button";
import { MessageCircleHeartIcon } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

const ChatButton = ({recieverId} : {recieverId : string}) => {
    const router = useRouter();

    const createOrNavigateToChat = async () => {
        try {
            const res = await axios.post('/api/chat/create-or-navigate', {
                recieverId
            })
            console.log(res.data);
            router.push(`/chat/${res.data.id}`)
        } catch (error : any) {
            toast.error(error.response.data.message);
        }
    }

  return (
    <Button
      onClick={createOrNavigateToChat}
      className="flex items-center gap-1.5 !bg-green-500 hover:!bg-green-600"
    >
      <MessageCircleHeartIcon size={35} />
      <span className="font-bold text-lg">Chat</span>
    </Button>
  );
};

export default ChatButton;
