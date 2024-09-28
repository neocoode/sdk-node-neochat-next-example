import React from 'react';

interface ChatStatusProps {
  chatId: string | null;
}

const ChatStatus: React.FC<ChatStatusProps> = ({ chatId }) => {
  return (
    <div className="text-sm text-gray-400 mt-2">
      {chatId ? (
        <p>Chat ID Selecionado: <span className="text-white">{chatId}</span></p>
      ) : (
        <p>Nenhum Chat ID selecionado.</p>
      )}
    </div>
  );
};

export default ChatStatus;
