import React from 'react';

interface ChatMessageProps {
  messageId: string;
  answer: string;
  type: "sent" | "received";
}

const ChatMessage: React.FC<ChatMessageProps> = ({ messageId, answer, type }) => {
  return (
    <li
      className={`relative p-4 rounded-lg max-w-xs ${
        type === "sent" ? "bg-green-600 self-end text-right ml-auto" : "bg-gray-800 self-start text-left"
      }`}
    >
      {/* Mensagem enviada ou recebida */}
      <p className="text-lg">{answer}</p>

      {/* Message ID no rodapé como marca d'água */}
      <span className="absolute right-2 bottom-2 text-xs text-gray-500">{messageId}</span>
    </li>
  );
};

export default ChatMessage;
