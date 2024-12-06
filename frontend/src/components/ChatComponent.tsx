"use client";

import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { Circle } from "lucide-react";
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

  // Set up recipient info
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

  // WebSocket setup
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

      if (msg.type === "ONLINE_STATUS" && msg.userId === recieverId) {
        setRecieverOnlineStatus(true);
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
  }, [recieverId, senderId, chatId]);  // Removed `recieverOnlineStatus` as dependency

  // Send message
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
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white p-4 border-b border-gray-200 flex items-center">
        <Image
          src={recieverData?.profilePicture || "/placeholder.png"}
          alt={recieverData?.name || "User"}
          width={40}
          height={40}
          className="rounded-full mr-3"
        />
        <h2 className="text-xl font-semibold">{recieverData?.name}</h2>
        <Circle
          className={`${
            recieverOnlineStatus
              ? "text-green-400 fill-green-400"
              : "text-red-400 fill-red-400"
          } ml-2`}
        />
      </div>

      <ScrollArea className="flex-1 p-4">
        {messages.length > 0 ? (
          messages.map((message: any, index) => (
            <div
              key={index}
              className={`mb-4 ${message.senderId === senderId ? "text-right" : ""}`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  message.senderId === senderId
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {message.content}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(message.createdAt).toLocaleTimeString()}
              </div>
            </div>
          ))
        ) : (
          <div>Start your conversation with {recieverData?.username}</div>
        )}
        <div ref={messageEndRef} />
      </ScrollArea>

      <form onSubmit={handleSendMessage} className="bg-white p-4 border-t">
        <div className="flex">
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 mr-2"
          />
          <Button disabled={!newMessage.trim()} type="submit">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
