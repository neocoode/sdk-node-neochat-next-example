import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

interface MessageListProps {
  messages: { messageId: string; answer: string; type: "sent" | "received" }[];
  scrollRef: React.RefObject<HTMLDivElement>; // Recebe o scrollRef
}

const MessageList: React.FC<MessageListProps> = ({ messages, scrollRef }) => {
  const messageListRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, scrollRef]);

  return (
    <ul ref={messageListRef} className="space-y-4 px-2 flex-grow">
      {messages.map(({ messageId, answer, type }, index) => (
        <ChatMessage key={index} messageId={messageId} answer={answer} type={type} />
      ))}
      <div ref={scrollRef} />
    </ul>
  );
};

export default MessageList;
