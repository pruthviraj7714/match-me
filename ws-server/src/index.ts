import type { WebSocket } from "ws";
import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NEXTAUTH_SECRET } from "./config";

const wss = new WebSocketServer({ port: 8080 });

const authorizeUser = (token: string): string | null => {
  try {
    const isVerified = jwt.verify(token, NEXTAUTH_SECRET!) as JwtPayload;
    if (isVerified) {
      return isVerified.userId;
    } else {
      return null;
    }
  } catch (error) {
    console.error("malformed token or not verified");
    return null;
  }
};

const users = new Map<string, WebSocket>();

function joinChat(userId: string) {
  const onlineUsers = Array.from(users.keys());

  users.forEach((socket) => {
    socket.send(
      JSON.stringify({
        type: "USER_JOINED",
        userId,
        onlineUsers: onlineUsers,
      })
    );
  });
}

function chatOthers(data: any, senderId: string) {
  const receiverId = data.receiverId;

  if (!receiverId || !data.message) {
    console.warn("Invalid message format");
    return;
  }

  const receiverSocket = users.get(receiverId);

  if (!receiverSocket) {
    console.log(
      "User is offline, fallback to HTTP or DB queue to store message"
    );
    return;
  }

  receiverSocket.send(
    JSON.stringify({
      type: "SEND_MESSAGE",
      message: data.message,
      senderId: senderId,
      time: data.sentAt || new Date().toISOString(),
    })
  );
}

function handleTyping(data: any, senderId: string) {
  const { receiverId, isTyping } = data;

  if (!receiverId || !isTyping || typeof isTyping !== "boolean") {
    return;
  }

  const receiverSocket = users.get(receiverId);

  if (!receiverSocket) return;

  receiverSocket.send(
    JSON.stringify({
      type: "TYPING",
      senderId: senderId,
      isTyping,
    })
  );
}

function handleReadReceipt(data: any, senderId: string) {
  const { receiverId, messageId } = data;

  if (!receiverId || !messageId) {
    return;
  }

  const receiverSocket = users.get(receiverId);

  if (!receiverSocket) return;

  receiverSocket.send(
    JSON.stringify({
      type: "READ_RECEIPT",
      senderId: senderId,
      messageId,
      readAt: new Date().toISOString(),
    })
  );
}

const leaveChat = (userId: string) => {
  users.delete(userId);

  const onlineUsers = Array.from(users.keys());

  users.forEach((socket) => {
    socket.send(
      JSON.stringify({
        type: "USER_LEFT",
        userId,
        onlineUsers,
      })
    );
  });
};

wss.on("connection", (socket: WebSocket, request) => {
  const url = request.url;

  const token = url?.split("?token=")[1];

  if (!token) {
    console.error("no token found!");
    return;
  }

  const userId = authorizeUser(token);

  if (!userId) {
    console.log("error authorizing user");
    socket.close();
    return;
  }

  if (users.has(userId)) {
    users.get(userId)?.close();
  }
  users.set(userId, socket);

  socket.on("message", (data) => {
    const parsedData = JSON.parse(data.toString());

    switch (parsedData.type) {
      case "JOIN":
        joinChat(userId);
        break;
      case "CHAT":
        chatOthers(parsedData, userId);
        break;
      case "TYPING":
        handleTyping(parsedData, userId);
        break;
      case "READ_RECEIPT":
        handleReadReceipt(parsedData, userId);
        break;
    }
  });

  socket.on("close", () => {
    leaveChat(userId);
  });

  socket.on("error", (err) => {
    console.error("WebSocket error:", err);
  });

  console.log("WebSocket server is running on ws://localhost:8080");
});

