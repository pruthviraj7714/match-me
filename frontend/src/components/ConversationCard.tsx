import { formatDistanceToNow, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { ChatProps, MessageProps } from "@/types/chat.types";


const ConversationCard = ({
  conversation,
  recipientUser,
}: {
  conversation: ChatProps;
  recipientUser: string;
}) => {
  const recipientInfo =
    conversation.user1.id === recipientUser
      ? conversation.user1
      : conversation.user2;

  const lastMessage = conversation?.messages[conversation.messages.length - 1];

  const unreadMessages = conversation.messages.filter(
    (message : MessageProps) => message.isRead === false
  );

  return (
    <Link
      href={`/chat/${conversation.id}`}
      key={conversation.id}
      className="block"
    >
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={recipientInfo.profilePicture}
              alt={recipientInfo.name}
              width={56}
              height={56}
              className="rounded-full border-2 border-primary"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {recipientInfo.name}
            </h3>
            <p className="text-sm text-gray-500 truncate">
              {lastMessage?.content || "Start Conversation 💝"}
            </p>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <span className="text-xs text-gray-400">
              {lastMessage?.createdAt
                ? formatDistanceToNow(parseISO(lastMessage.createdAt), {
                    addSuffix: true,
                  })
                : "No messages yet"}
            </span>
            {!lastMessage ? (
              <span className="inline-flex items-center justify-center w-6 h-6 bg-primary rounded-full">
                <MessageCircle size={14} className="text-white" />
              </span>
            ) : (
              <span className="inline-flex items-center justify-center w-6 h-6 bg-primary rounded-full">
                <span className="text-white font-mono text-sm">
                  {unreadMessages?.length}
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ConversationCard;
