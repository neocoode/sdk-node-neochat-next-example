import React from 'react';

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  sendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ message, setMessage, sendMessage, handleKeyPress }) => {
  return (
    <div className="w-full p-4 bg-gray-800 shadow-md fixed bottom-0 left-0 right-0 border-t border-gray-700">
      <div className="flex space-x-2">
        <textarea
          className="flex-grow p-2 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none w-full"
          rows={2} // Altura mínima do textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)} // Atualiza o estado da mensagem
          onKeyDown={handleKeyPress} // Trata o evento de tecla
          placeholder="Digite sua mensagem (Cmd/Ctrl + Enter para enviar)"
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
