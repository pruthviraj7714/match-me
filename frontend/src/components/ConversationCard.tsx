import Image from "next/image";

const ConversationCard = ({conversation} : {conversation : any}) => {
  return (
    <div
      key={conversation.id}
      className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 ${
        selectedConversation.id === conversation.id ? "bg-gray-100" : ""
      }`}
      onClick={() => setSelectedConversation(conversation)}
    >
      <Image
        src={conversation.avatar}
        alt={conversation.name}
        width={40}
        height={40}
        className="rounded-full mr-3"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{conversation.name}</h3>
        <p className="text-sm text-gray-500 truncate">
          {conversation.lastMessage}
        </p>
      </div>
      {conversation.unread > 0 && (
        <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {conversation.unread}
        </span>
      )}
    </div>
  );
};

export default ConversationCard;
