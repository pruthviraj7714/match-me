import WebSocket from "ws";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket: WebSocket) => {
  console.log("User connected");

  socket.on("message", (data) => {
    console.log("Message Recieved" + data.toString());

    socket.send(`Server received: ${data}`);
  });

  socket.on("close", () => {
    console.log("User disconnected");
  });

  socket.on("error", (err) => {
    console.error("WebSocket error:", err);
  });
});
console.log("WebSocket server is running on ws://localhost:8080");
