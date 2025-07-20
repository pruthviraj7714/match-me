import { useEffect, useState, useRef } from "react";
import { MessageTypes, TypingIndicatorTypes } from "@/types/chat.types";

interface MessagePayload {
  type: MessageTypes;
  receiverId: string;
  senderId: string;
  message: string;
  chatId: string;
}

export interface TypingIndicatorPayload {
  type: TypingIndicatorTypes;
  receiverId: string;
  senderId: string;
}

export interface ReadReceiptPayload {
  chatId : string,
  type: "READ_RECEIPT";
  receiverId: string;
  senderId: string;
}

const WS_URL = process.env.NEXT_PUBLIC_WS_URL;

const useSocket = (token: string | null) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!token) return;

    const ws = new WebSocket(`${WS_URL}?token=${token}`);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("Client connected");
      setIsConnected(true);
      ws.send(
        JSON.stringify({
          type: "JOIN",
        })
      );
      setSocket(ws);
    };

    ws.onclose = () => {
      console.log("Client disconnected");
      setIsConnected(false);
    };

    return () => {
      console.log("Closing socket connection");
      ws.close();
      socketRef.current = null;
    };
  }, [token]);

  const sendMessage = (payload: MessagePayload) => {
    socket?.send(JSON.stringify(payload));
  };

  return {
    socket,
    isConnected,
    sendMessage,
  };
};

export default useSocket;
