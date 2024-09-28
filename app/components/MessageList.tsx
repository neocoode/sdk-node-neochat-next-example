import React from 'react';
import ChatMessage from './ChatMessage';

interface MessageListProps {
  messages: { messageId: string; answer: string; type: "sent" | "received" }[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex-grow overflow-y-auto p-6">
      <div className="w-full max-w-lg mx-auto">
        <ul className="space-y-4">
          {messages.map(({ messageId, answer, type }, index) => (
            <ChatMessage key={index} messageId={messageId} answer={answer} type={type} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MessageList;
