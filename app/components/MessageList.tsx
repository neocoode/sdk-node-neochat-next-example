import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { IAnswerDataSearch } from "@/app/interfaces/IAnswerDataSearch";

interface MessageListProps {
  messages: {
    messageId: string;
    answer: string;
    searchs?: IAnswerDataSearch[];
    typeMessage: "sent" | "received";
    type: "Search" | "Answer" | "Question" | "Keyword";
  }[];
  scrollRef: React.RefObject<HTMLDivElement>; 
  onSendMessageKeyword: (message: string) => void; 
}

const MessageList: React.FC<MessageListProps> = ({ messages, scrollRef, onSendMessageKeyword }) => {
  console.log('messages', messages)
  const messageListRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, scrollRef]);

  return (
    <ul ref={messageListRef} className="space-y-4 px-2 flex-grow">
      {messages.map(({ messageId, answer, searchs, type, typeMessage }, index) => (
        <ChatMessage
          key={index}
          messageId={messageId}
          answer={answer}
          searchs={searchs}
          type={type}
          typeMessage={typeMessage}
          onSendMessageKeyword={onSendMessageKeyword}
        />
      ))}
      <div ref={scrollRef} />
    </ul>
  );
};

export default MessageList;
