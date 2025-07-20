"use client";

import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { Circle, Send, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import useSocket from "@/hooks/useSocket";
import { useSession } from "next-auth/react";

interface IMessage {
  chatId: string;
  content: string;
  createdAt: Date;
  deliveredAt: Date;
  id: string;
  isRead: boolean;
  senderId: string;
}
const ChatComponent = ({
  chatId,
  senderId,
  prevMessages,
  participants,
}: {
  chatId: string;
  senderId: string;
  prevMessages: any;
  participants: any;
}) => {
  const [messages, setMessages] = useState<IMessage[]>(prevMessages.messages);
  const [recieverId, setRecieverId] = useState<string | null>(null);
  const [recieverData, setRecieverData] = useState<any>(null);
  const [recieverOnlineStatus, setRecieverOnlineStatus] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isConnecting, setIsConnecting] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const { data: session } = useSession();
  const token = session?.user.accessToken!;
  const { isConnected, sendMessage, socket } =
    useSocket(token);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    setRecieverId(
      participants.user1Id !== senderId
        ? participants.user1Id
        : participants.user2Id
    );
    setRecieverData(
      prevMessages.user1.id !== senderId
        ? prevMessages.user1
        : prevMessages.user2
    );
  }, [participants, prevMessages, senderId]);
  useEffect(() => {
    if (!socket || !isConnected) return;
    setIsConnecting(false);

    socket.onmessage = ({ data }) => {
      const parsedData = JSON.parse(data);
      if (parsedData.type === "USER_JOINED") {
        if (
          parsedData.onlineUsers &&
          (parsedData.onlineUsers || []).length > 0
        ) {
          const res = parsedData.onlineUsers.some(
            (u: string) => u === recieverId
          );
          if (res) {
            setRecieverOnlineStatus(true);
          } else {
            setRecieverOnlineStatus(false);
          }
        }
      } else if (parsedData.type === "TYPING") {
        if (parsedData.chatId === chatId) {
          console.log(parsedData);
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
          }, 2000);
        }
      } else if (parsedData.type === "SEND_MESSAGE") {
        console.log(parsedData);
        if (parsedData.chatId === chatId) {
          setMessages((prev) => [
            ...prev,
            {
              chatId: parsedData.chatId,
              content: parsedData.message,
              createdAt: parsedData.time,
              deliveredAt: parsedData.time,
              id: Math.random().toString(),
              isRead: false,
              senderId: parsedData.senderId,
            },
          ]);
        }
      } else if (parsedData.type === "USER_LEFT") {
        if (parsedData.userId === recieverId) {
          setRecieverOnlineStatus(false);
        }
      }
    };
    return () => {
      socket.close();
      setIsConnecting(false);
    };
  }, [recieverId, senderId, chatId, isConnected, socket]);
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !recieverId || !senderId) return;
    setIsTyping(false);
    try {
      const res = await axios.post("/api/chat/send-message", {
        chatId,
        senderId,
        message: newMessage,
      });
      setMessages((prev) => [...prev, res.data.msg]);
      sendMessage({
        type: "CHAT",
        chatId,
        senderId,
        receiverId: recieverId,
        message: res.data.msg,
      });
      setNewMessage("");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Message sending failed");
    }
  };
  const handleTyping = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    socket?.send(
      JSON.stringify({
        type: "TYPING",
        isTyping: true,
        chatId,
        senderId,
        recieverId,
      })
    );
    typingTimeoutRef.current = setTimeout(() => {
      socket?.send(
        JSON.stringify({
          type: "TYPING",
          isTyping: false,
          chatId,
          senderId,
          recieverId,
        })
      );
    }, 1500);
  };
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };
  useEffect(scrollToBottom, [messages]);
  return (
    <div className="min-h-[43vw] flex flex-col bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-white p-4 border-b border-pink-200 flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative">
            <Image
              src={
                recieverData?.profilePicture ||
                "/placeholder.svg?height=48&width=48&query=user avatar"
              }
              alt={recieverData?.name || "User"}
              width={48}
              height={48}
              className="rounded-full border-2 border-pink-300"
            />
            <Circle
              className={`absolute bottom-0 right-0 w-3 h-3 ${
                recieverOnlineStatus
                  ? "text-green-500 fill-green-500" 
                  : "text-rose-500 fill-rose-500" 
              }`}
            />
          </div>
          <div className="ml-3">
            <h2 className="text-xl font-semibold text-gray-800">
              {recieverData?.name}
            </h2>
            <p className="text-sm text-gray-600">
              {recieverOnlineStatus ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        {isConnecting && (
          <div className="flex items-center text-amber-500">
            {" "}
            {/* Amber for connecting */}
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Connecting...
          </div>
        )}
      </div>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        {messages.length > 0 ? (
          messages.map((message: any, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                message.senderId === senderId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.senderId === senderId
                    ? "bg-pink-500 text-white" 
                    : "bg-pink-100 text-gray-800" 
                } shadow-md transition-all duration-300 ease-in-out hover:shadow-lg`}
              >
                <p>{message.content}</p>
                <div
                  className={`text-xs mt-1 ${
                    message.senderId === senderId
                      ? "text-pink-200" 
                      : "text-gray-500" 
                  }`}
                >
                  {new Date(message.createdAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-lg font-semibold text-pink-500 mt-10">
            Start your conversation with {recieverData?.username} 💝
          </div>
        )}
        <div ref={messageEndRef} />
      </ScrollArea>
      <form
        onSubmit={handleSendMessage}
        className="bg-white p-4 border-t border-pink-200"
      >
        <span className="text-sm text-pink-600">
          {" "}
          {isTyping && "typing..."}
        </span>
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTyping();
            }}
            className="flex-1 mr-2 bg-pink-50 border-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
          />
          <Button
            disabled={!newMessage.trim()}
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 transition-colors duration-300"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};
export default ChatComponent;
