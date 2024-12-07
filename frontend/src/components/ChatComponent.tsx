"use client";

import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { Circle, Send, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";

const ChatComponent = ({
  chatId,
  senderId,
  prevMessages,
}: {
  chatId: string;
  senderId: string;
  prevMessages: any;
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<any[]>(prevMessages.messages);
  const [recieverId, setRecieverId] = useState<string | null>(null);
  const [recieverData, setRecieverData] = useState<any>(null);
  const [recieverOnlineStatus, setRecieverOnlineStatus] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isConnecting, setIsConnecting] = useState(true);

  const messageEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRecieverId(
      prevMessages.user1.id !== senderId
        ? prevMessages.user1.id
        : prevMessages.user2.id
    );
    setRecieverData(
      prevMessages.user1.id !== senderId
        ? prevMessages.user1
        : prevMessages.user2
    );
  }, [prevMessages, senderId]);

  useEffect(() => {
    if (!recieverId) return;

    const ws = new WebSocket("ws://localhost:8080/");
    setSocket(ws);

    ws.onopen = () => {
      setIsConnecting(false);
      ws.send(
        JSON.stringify({
          type: "ONLINE",
          userId: senderId,
        })
      );
    };

    ws.onmessage = ({ data }: { data: string }) => {
      const msg = JSON.parse(data.toString());

      if (msg.type === "ONLINE_USERS") {
        const isRecieverOnline = msg.users.some((u: any) => {
          return u[0] === recieverId;
        });

        isRecieverOnline
          ? setRecieverOnlineStatus(true)
          : setRecieverOnlineStatus(false);
      }

      if (msg.type === "MESSAGE_RECEIVED" && msg.chatId === chatId) {
        setMessages((prev) => [...prev, msg.message]);
      }
    };

    ws.onerror = (err) => {
      toast.error("WebSocket error");
      console.error(err);
    };

    ws.onclose = () => {
      setIsConnecting(true);
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, [recieverId, senderId, chatId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const res = await axios.post("/api/chat/send-message", {
        chatId,
        senderId,
        message: newMessage,
      });

      setMessages((prev) => [...prev, res.data.msg]);
      socket?.send(
        JSON.stringify({
          type: "SEND_MESSAGE",
          chatId,
          senderId,
          recieverId,
          message: res.data.msg,
        })
      );
      setNewMessage("");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Message sending failed");
    }
  };

  // Scroll to the bottom when a new message is added
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="min-h-[43vw] flex flex-col bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative">
            <Image
              src={recieverData?.profilePicture || "/placeholder.png"}
              alt={recieverData?.name || "User"}
              width={48}
              height={48}
              className="rounded-full border-2 border-gray-200"
            />
            <Circle
              className={`absolute bottom-0 right-0 w-3 h-3 ${
                recieverOnlineStatus
                  ? "text-green-400 fill-green-400"
                  : "text-red-400 fill-red-400"
              }`}
            />
          </div>
          <div className="ml-3">
            <h2 className="text-xl font-semibold">{recieverData?.name}</h2>
            <p className="text-sm text-gray-500">
              {recieverOnlineStatus ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        {isConnecting && (
          <div className="flex items-center text-yellow-500">
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
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                } shadow-md transition-all duration-300 ease-in-out hover:shadow-lg`}
              >
                <p>{message.content}</p>
                <div
                  className={`text-xs mt-1 ${
                    message.senderId === senderId
                      ? "text-blue-200"
                      : "text-gray-500"
                  }`}
                >
                  {new Date(message.createdAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-lg font-semibold text-gray-500 mt-10">
            Start your conversation with {recieverData?.username} 💝
          </div>
        )}
        <div ref={messageEndRef} />
      </ScrollArea>

      <form onSubmit={handleSendMessage} className="bg-white p-4 border-t">
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 mr-2 bg-gray-100 border-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          <Button
            disabled={!newMessage.trim()}
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
