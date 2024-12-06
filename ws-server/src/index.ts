import WebSocket from "ws";
import { WebSocketServer } from "ws";
import { User } from "./userManager";

const wss = new WebSocketServer({ port: 8080 });
const users = new Map<string, User>();

wss.on("connection", (socket: WebSocket) => {
  let currentUser: User | null = null;

  socket.on("message", (data) => {
    const msg = JSON.parse(data.toString());

    switch (msg.type) {
      case "ONLINE": {
        const userId = msg.userId;
        if (!users.has(userId)) {
          const newUser = new User(userId);
          users.set(userId, newUser);
        }

        currentUser = users.get(userId)!;
        currentUser.setSocket(socket);

        users.forEach((user, id) => {
          if (id !== userId) {
            user.handleOnlineStatus({ userId, status: "online" });
          }
        });

        break;
      }

      case "SEND_MESSAGE": {
        const { chatId, senderId, message, recieverId } = msg;

        const reciever = users.get(recieverId);
        if (reciever) {
          reciever.sendMessage(chatId, senderId, message);
        } else {
          socket.send(
            JSON.stringify({
              type: "USER_OFFLINE",
              message: `User ${recieverId} is offline. Message will be delivered once they are online.`,
            })
          );
        }
        break;
      }

      case "FETCH_ONLINE_USERS": {
        const onlineUsers = [...users].filter(([id, user]) => user.isOnline);

        socket.send(
          JSON.stringify({
            type: "ONLINE_USERS",
            users: onlineUsers,
          })
        );
        break;
      }
    }
  });

  socket.on("close", () => {
    if (currentUser) {
      currentUser.handleDisconnect();
      
      users.forEach((user, id) => {
        if (id !== currentUser?.userId) {
          user.handleOnlineStatus({ userId: currentUser?.userId, status: "offline" });
        }
      });
      users.delete(currentUser.userId); 


      console.log(`User ${currentUser.userId} disconnected`);
    }
  });

  socket.on("error", (err) => {
    console.error("WebSocket error:", err);
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
