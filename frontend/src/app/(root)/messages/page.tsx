// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { fetchChats } from "@/actions/chatActions";
// import { toast } from "sonner";
// import ConversationCard from "@/components/ConversationCard";


// export default function MessagesPage() {
//   const [conversations, setConversations] = useState([]);
//   const [selectedConversation, setSelectedConversation] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   const fetchAllConversations = async () => {
//     try {
//       const chats = await fetchChats();
//       setConversations(chats);
//       if (chats.length > 0) setSelectedConversation(chats[0]);
//     } catch (error: any) {
//       toast.error(error.message);
//     }
//   };

//   const handleSendMessage = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (newMessage.trim()) {
//       console.log("Sending message:", newMessage);
//       setNewMessage("");
//     }
//   };

//   useEffect(() => {
//     fetchAllConversations();
//   }, []);

//   if (!selectedConversation) {
//     return <p>Loading chats...</p>;
//   }

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <div className="w-1/3 bg-white border-r border-gray-200">
//         <h2 className="text-xl font-semibold p-4 border-b">Messages</h2>
//         <ScrollArea className="h-[calc(100vh-5rem)]">
//           {conversations.map((conversation) => (
//            <ConversationCard conversation={conversation} key={conversation.id} />
//           ))}
//         </ScrollArea>
//       </div>

//       <div className="flex-1 flex flex-col">
//         <div className="bg-white p-4 border-b border-gray-200 flex items-center">
//           <Image
//             src={selectedConversation.avatar}
//             alt={selectedConversation.name}
//             width={40}
//             height={40}
//             className="rounded-full mr-3"
//           />
//           <h2 className="text-xl font-semibold">{selectedConversation.name}</h2>
//         </div>

//         <ScrollArea className="flex-1 p-4">
//           {messages.map((message) => (
//             <div
//               key={message.id}
//               className={`mb-4 ${
//                 message.senderId === session.user.id ? "text-right" : ""
//               }`}
//             >
//               <div
//                 className={`inline-block p-2 rounded-lg ${
//                   message.senderId === session.user.id
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-200"
//                 }`}
//               >
//                 {message.text}
//               </div>
//               <div className="text-xs text-gray-500 mt-1">
//                 {new Date(message.timestamp).toLocaleTimeString()}
//               </div>
//             </div>
//           ))}
//         </ScrollArea>

//         <form
//           onSubmit={handleSendMessage}
//           className="bg-white p-4 border-t border-gray-200"
//         >
//           <div className="flex">
//             <Input
//               type="text"
//               placeholder="Type a message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               className="flex-1 mr-2"
//             />
//             <Button type="submit">Send</Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
