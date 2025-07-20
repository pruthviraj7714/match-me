import { UserProps } from "./user.types";

export interface MessageProps {
  id: string;
  senderId: string;
  content: string;
  deliveredAt: Date;
  isRead: boolean;
  createdAt: string;
  chatId: string;
}

export interface ChatProps {
  id: string;
  user1Id: string;
  user2Id: string;
  createdAt: Date;
  messages: MessageProps[];
  user1: UserProps;
  user2: UserProps;
}



export type MessageTypes = "CHAT";
export type TypingIndicatorTypes = "TYPING";
export type ReadReceipt = "READ_RECEIPT";
export type JoinRoomTypes = "JOIN";

