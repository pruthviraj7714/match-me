import { fetchParticipants, fetchPrevMessages } from "@/actions/chatActions";
import ChatComponent from "@/components/ChatComponent";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const ChatPage = async ({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) => {
  const chatId = (await params).chatId;
  const session = await getServerSession(authOptions);
  const fetchMessages = await fetchPrevMessages({ chatId });
  const participants = await fetchParticipants({chatId});

  return (
    <>
      <ChatComponent
        chatId={chatId}
        senderId={session?.user.id!}
        prevMessages={fetchMessages}
        participants={participants}
      />
    </>
  );
};

export default ChatPage;
