import WebSocket from "ws";

export class User {
  public userId: string;
  public isOnline: boolean;
  private socket: WebSocket | null;

  constructor(userId: string) {
    this.userId = userId;
    this.isOnline = false;
    this.socket = null;
  }

  setSocket(socket: WebSocket) {
    this.socket = socket;
    this.isOnline = true;
  }

  handleOnlineStatus(msg: any) {
    if (!this.socket) return;

    this.isOnline = true;
    this.socket.send(
      JSON.stringify({
        type: "ONLINE_STATUS",
        userId: msg.userId,
        status: "online",
      })
    );
  }

  sendMessage(chatId: string, senderId: string, message: string) {
    if (!this.socket) return;

    this.socket.send(
      JSON.stringify({
        type: "MESSAGE_RECEIVED",
        chatId,
        senderId,
        message,
      })
    );
  }

  handleDisconnect() {
    this.isOnline = false;
    this.socket = null;
  }
}
