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
