import React from 'react';

interface ChatMessageProps {
  messageId: string;
  answer: string;
  type: "sent" | "received";
}

const ChatMessage: React.FC<ChatMessageProps> = ({ messageId, answer, type }) => {
  return (
    <li
      className={`relative px-2 pt-1 pb-2 rounded-lg w-[80%] ${
        type === "sent" ? "bg-gray-800 self-end text-right ml-auto" : "bg-gray-700 self-start text-left mr-auto"
      }`}
    >
      {/* Mensagem enviada ou recebida */}
      <p className="text-lg">{answer}</p>

      {/* Message ID no rodapé como marca d'água */}
      <span className="right-2 bottom-2 text-xs text-gray-500">{messageId}</span>
    </li>
  );
};

export default ChatMessage;
